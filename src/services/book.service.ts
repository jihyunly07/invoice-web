/**
 * 도서 Service - 비즈니스 로직 레이어
 * Repository를 통해 데이터를 가져오고 필터링/검색/통계 처리
 */

import type { Book, ReadingStatus, ReadingStatusFilter } from '@/types/book';
import {
  getAllBooks,
  getBookById,
  getBooksByStatus,
  getBooksByTags,
} from '@/repositories/book.repository';

/**
 * 도서 목록 필터 옵션
 */
export interface BookListOptions {
  /** 독서 상태 필터 ('all'이면 전체) */
  status?: ReadingStatusFilter;
  /** 검색어 (제목, 저자, 태그 대상) */
  search?: string;
  /** 태그 필터 */
  tags?: string[];
}

/**
 * 도서 통계
 */
export interface BookStats {
  /** 전체 도서 수 */
  total: number;
  /** 읽고싶음 수 */
  wishlist: number;
  /** 읽는중 수 */
  reading: number;
  /** 완독 수 */
  completed: number;
}

/**
 * 검색어로 도서 필터링 (제목, 저자, 태그 대상, 대소문자 무시)
 */
function filterBySearch(books: Book[], search: string): Book[] {
  const keyword = search.trim().toLowerCase();
  if (!keyword) return books;

  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(keyword) ||
      book.author.toLowerCase().includes(keyword) ||
      book.tags.some((tag) => tag.toLowerCase().includes(keyword)),
  );
}

/**
 * 도서 목록 조회 (필터 + 검색 적용)
 *
 * - status가 'all'이거나 없으면 전체 조회 후 클라이언트 필터링
 * - tags가 있으면 Notion 필터 사용
 * - search는 클라이언트 사이드 필터링
 */
export async function getBooks(options: BookListOptions = {}): Promise<Book[]> {
  const { status, search, tags } = options;

  let books: Book[];

  // 태그 필터가 있으면 태그별 조회
  if (tags && tags.length > 0) {
    books = await getBooksByTags(tags);

    // 추가로 상태 필터 적용
    if (status && status !== 'all') {
      books = books.filter((book) => book.status === status);
    }
  } else if (status && status !== 'all') {
    // 상태별 조회
    books = await getBooksByStatus(status as ReadingStatus);
  } else {
    // 전체 조회
    books = await getAllBooks();
  }

  // 검색어 필터 적용
  if (search) {
    books = filterBySearch(books, search);
  }

  return books;
}

/**
 * 개별 도서 조회
 * 찾지 못하면 BookNotFoundError throw
 */
export async function getBook(pageId: string): Promise<Book> {
  return getBookById(pageId);
}

/**
 * 도서 통계 계산
 */
export async function getBookStats(): Promise<BookStats> {
  const books = await getAllBooks();

  return books.reduce(
    (stats, book) => {
      stats.total += 1;
      stats[book.status] += 1;
      return stats;
    },
    { total: 0, wishlist: 0, reading: 0, completed: 0 } as BookStats,
  );
}

/**
 * 모든 태그 목록 조회 (중복 제거, 가나다 순)
 */
export async function getAllTags(): Promise<string[]> {
  const books = await getAllBooks();
  const tagSet = new Set(books.flatMap((book) => book.tags));
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b, 'ko'));
}
