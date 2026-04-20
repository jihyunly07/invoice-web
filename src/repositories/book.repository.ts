/**
 * 도서 Repository - Notion API 데이터 접근 레이어
 * 서버 사이드 전용 (Notion API 키 보호)
 */

import { unstable_cache } from 'next/cache';
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';
import type { Book, ReadingStatus } from '@/types/book';
import type { NotionPage } from '@/types/notion';
import { getNotionClient, DATABASE_ID } from '@/lib/notion';
import { transformNotionPageToBook } from '@/lib/notion/transformers';
import { NotionAPIError, BookNotFoundError, RateLimitError, NetworkError } from '@/lib/errors';

/** 재시도 최대 횟수 */
const MAX_RETRIES = 3;
/** 재시도 기본 지연 시간 (ms) */
const RETRY_BASE_DELAY_MS = 1000;
/** 캐시 유효 시간 (초) */
const CACHE_REVALIDATE_SECONDS = 60;

/**
 * 재시도 로직이 포함된 Notion API 호출 래퍼
 * Rate limit(429) 및 네트워크 에러 시 지수 백오프로 재시도
 */
async function withRetry<T>(fn: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;

    const isRateLimit =
      error instanceof Error &&
      'code' in error &&
      (error as { code: string }).code === 'rate_limited';
    const isNetworkError =
      error instanceof Error && error.message.toLowerCase().includes('network');

    if (isRateLimit || isNetworkError) {
      /* 마지막 재시도도 실패 시 도메인 에러로 변환 */
      if (retries <= 1) {
        if (isRateLimit) throw new RateLimitError();
        if (isNetworkError) throw new NetworkError();
      }

      const attempt = MAX_RETRIES - retries + 1;
      const delayMs = RETRY_BASE_DELAY_MS * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      return withRetry(fn, retries - 1);
    }

    throw error;
  }
}

/**
 * Notion API 에러를 도메인 에러로 변환
 */
function handleNotionError(error: unknown, context: string): never {
  if (error instanceof BookNotFoundError) throw error;

  if (error instanceof Error) {
    const notionError = error as Error & { code?: string; status?: number };
    throw new NotionAPIError(
      `${context}: ${notionError.message}`,
      notionError.code,
      notionError.status,
    );
  }

  throw new NotionAPIError(`${context}: 알 수 없는 에러`);
}

/**
 * Notion DB 쿼리 실행 (페이지네이션 처리)
 */
async function queryDatabase(filter?: QueryDatabaseParameters['filter']): Promise<Book[]> {
  const notion = getNotionClient();
  const pages: NotionPage[] = [];
  let cursor: string | undefined;

  do {
    const response = await withRetry(() =>
      notion.databases.query({
        database_id: DATABASE_ID,
        filter,
        sorts: [{ timestamp: 'last_edited_time', direction: 'descending' }],
        page_size: 100,
        ...(cursor ? { start_cursor: cursor } : {}),
      }),
    );

    pages.push(...(response.results as NotionPage[]));
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return pages.map(transformNotionPageToBook);
}

/**
 * 전체 도서 목록 조회 (최근 수정 순)
 */
async function _getAllBooks(): Promise<Book[]> {
  try {
    return await queryDatabase();
  } catch (error) {
    handleNotionError(error, '전체 도서 목록 조회 실패');
  }
}

/** UUID v4 형식 정규식 */
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * 특정 도서 조회 (ID 기반)
 */
async function _getBookById(pageId: string): Promise<Book> {
  /* UUID 형식이 아니면 즉시 404 처리 (Notion API 호출 불필요) */
  if (!UUID_REGEX.test(pageId)) {
    throw new BookNotFoundError(pageId);
  }

  try {
    const notion = getNotionClient();
    const page = await withRetry(() => notion.pages.retrieve({ page_id: pageId }));

    // 아카이브된 페이지 처리
    if ('archived' in page && page.archived) {
      throw new BookNotFoundError(pageId);
    }

    return transformNotionPageToBook(page as NotionPage);
  } catch (error) {
    if (error instanceof BookNotFoundError) throw error;

    const notionError = error as Error & { code?: string; status?: number };
    if (notionError.status === 404 || notionError.code === 'object_not_found') {
      throw new BookNotFoundError(pageId);
    }

    handleNotionError(error, `도서 조회 실패 (ID: ${pageId})`);
  }
}

/**
 * 독서 상태별 도서 목록 조회
 */
async function _getBooksByStatus(status: ReadingStatus): Promise<Book[]> {
  try {
    return await queryDatabase({
      property: 'Status',
      select: { equals: status },
    });
  } catch (error) {
    handleNotionError(error, `상태별 도서 조회 실패 (status: ${status})`);
  }
}

/**
 * 태그별 도서 목록 조회 (OR 조건 - 지정 태그 중 하나 이상 포함)
 */
async function _getBooksByTags(tags: string[]): Promise<Book[]> {
  if (tags.length === 0) return [];

  try {
    // Notion multi_select 필터는 OR 조건 지원 (contains)
    const filter: QueryDatabaseParameters['filter'] =
      tags.length === 1
        ? {
            property: 'Tags',
            multi_select: { contains: tags[0] },
          }
        : {
            or: tags.map((tag) => ({
              property: 'Tags',
              multi_select: { contains: tag },
            })),
          };

    return await queryDatabase(filter);
  } catch (error) {
    handleNotionError(error, `태그별 도서 조회 실패 (tags: ${tags.join(', ')})`);
  }
}

/**
 * 전체 도서 목록 조회 (캐시 적용, 60초 revalidate)
 */
export const getAllBooks = unstable_cache(_getAllBooks, ['books-all'], {
  revalidate: CACHE_REVALIDATE_SECONDS,
  tags: ['books'],
});

/**
 * 특정 도서 조회 (캐시 적용, 60초 revalidate)
 * pageId별 개별 캐시 태그로 세밀한 revalidation 지원
 */
export function getBookById(pageId: string) {
  return unstable_cache(
    () => _getBookById(pageId),
    [`book-${pageId}`],
    {
      revalidate: CACHE_REVALIDATE_SECONDS,
      tags: ['books', `book-${pageId}`],
    },
  )();
}

/**
 * 상태별 도서 목록 조회 (캐시 적용, 60초 revalidate)
 */
export const getBooksByStatus = unstable_cache(
  (status: ReadingStatus) => _getBooksByStatus(status),
  ['books-by-status'],
  {
    revalidate: CACHE_REVALIDATE_SECONDS,
    tags: ['books'],
  },
);

/**
 * 태그별 도서 목록 조회 (캐시 적용, 60초 revalidate)
 */
export const getBooksByTags = unstable_cache(
  (tags: string[]) => _getBooksByTags(tags),
  ['books-by-tags'],
  {
    revalidate: CACHE_REVALIDATE_SECONDS,
    tags: ['books'],
  },
);
