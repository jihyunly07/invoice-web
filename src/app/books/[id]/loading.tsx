/**
 * 도서 상세 페이지 로딩 상태
 * book-detail 레이아웃을 모방한 스켈레톤
 */

import { Container } from '@/components/layout/container';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function BookDetailLoading() {
  return (
    <Container className="py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* 뒤로가기 버튼 스켈레톤 */}
        <Skeleton className="h-9 w-28" />

        <Card>
          <CardHeader className="space-y-4">
            {/* 제목 & 저자 스켈레톤 */}
            <div className="space-y-2">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
            </div>
            {/* 상태 배지 스켈레톤 */}
            <Skeleton className="h-5 w-16 rounded-full" />
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 평점 스켈레톤 */}
            <div className="space-y-1">
              <Skeleton className="h-4 w-8" />
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Skeleton key={i} className="h-5 w-5 rounded-sm" />
                ))}
              </div>
            </div>

            {/* 날짜 스켈레톤 */}
            <div className="space-y-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-32" />
            </div>

            {/* 태그 스켈레톤 */}
            <div className="space-y-1">
              <Skeleton className="h-4 w-8" />
              <div className="flex gap-1">
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-10 rounded-full" />
              </div>
            </div>

            {/* 한줄평 스켈레톤 */}
            <div className="space-y-1">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-16 w-full rounded-lg" />
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
