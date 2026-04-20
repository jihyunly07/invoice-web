/**
 * 홈 페이지 (독서 목록)
 * Server Component - searchParams로 독서 상태 필터 처리
 */

import { Suspense } from 'react';
import { Container } from '@/components/layout/container';
import { PageHeader } from '@/components/layout/page-header';
import { BookFilterTabs } from '@/components/books/book-filter-tabs';
import { BookList } from '@/components/books/book-list';
import { Skeleton } from '@/components/ui/skeleton';
import { Book, ReadingStatus } from '@/types/book';
import { READING_STATUS } from '@/lib/constants';

/** 유효한 ReadingStatus 값 집합 */
const VALID_STATUSES = new Set<string>([
  READING_STATUS.WISHLIST,
  READING_STATUS.READING,
  READING_STATUS.COMPLETED,
]);

/**
 * 전체 도서 목록 조회 (Phase 0 완료 후 실제 Repository 연동)
 * TODO: import { getAllBooks } from '@/repositories/book-repository'
 */
async function getAllBooks(): Promise<Book[]> {
  return [];
}

/**
 * 상태별 도서 목록 조회 (Phase 0 완료 후 실제 Repository 연동)
 * TODO: import { getBooksByStatus } from '@/repositories/book-repository'
 */
async function getBooksByStatus(_status: ReadingStatus): Promise<Book[]> {
  return [];
}

/** 필터 탭 로딩 중 스켈레톤 */
function FilterTabsSkeleton() {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 4 }, (_, i) => (
        <Skeleton key={i} className="h-9 w-16 rounded-md" />
      ))}
    </div>
  );
}

interface HomeProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  /* Next.js 15: searchParams는 Promise */
  const { status } = await searchParams;

  /* 유효한 ReadingStatus인 경우 상태 필터 적용, 그 외 전체 조회 */
  const books = status && VALID_STATUSES.has(status)
    ? await getBooksByStatus(status as ReadingStatus)
    : await getAllBooks();

  return (
    <Container className="py-8">
      <div className="space-y-8">
        <PageHeader
          title="나의 독서 기록"
          description="읽고 싶은 책과 읽은 책을 기록해보세요"
        />

        {/* BookFilterTabs는 useSearchParams 사용으로 Suspense 필수 */}
        <Suspense fallback={<FilterTabsSkeleton />}>
          <BookFilterTabs />
        </Suspense>

        <BookList books={books} />
      </div>
    </Container>
  );
}
