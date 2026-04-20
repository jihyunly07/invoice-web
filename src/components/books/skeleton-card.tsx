/**
 * 도서 카드 스켈레톤 컴포넌트
 * 도서 목록 로딩 중 book-card 형태를 모방한 플레이스홀더
 */

import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm">
      {/* 제목 영역 */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* 상태 배지 */}
      <Skeleton className="h-5 w-16 rounded-full" />

      {/* 별점 */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} className="h-4 w-4 rounded-sm" />
        ))}
      </div>

      {/* 태그 */}
      <div className="flex gap-1">
        <Skeleton className="h-5 w-12 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>

      {/* 날짜 */}
      <Skeleton className="h-4 w-24" />
    </div>
  );
}
