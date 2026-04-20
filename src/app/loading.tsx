/**
 * 글로벌 로딩 페이지
 * 도서 목록 로딩 중 SkeletonCard 그리드 표시
 */

import { Container } from '@/components/layout/container';
import { SkeletonCard } from '@/components/books/skeleton-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <Container className="py-8">
      <div className="space-y-8">
        {/* 페이지 헤더 스켈레톤 */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-6 w-72" />
        </div>

        {/* 필터 탭 스켈레톤 */}
        <div className="flex gap-2">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-9 w-16 rounded-md" />
          ))}
        </div>

        {/* 도서 카드 그리드 스켈레톤 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </Container>
  );
}
