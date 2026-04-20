'use client';

/**
 * 독서 상태 필터 탭 컴포넌트
 * URL 쿼리 파라미터(?status=)와 동기화되는 필터 탭
 *
 * 주의: useSearchParams 사용으로 인해 이 컴포넌트를 사용하는 쪽에서
 * 반드시 <Suspense> 로 감싸야 합니다.
 * 예: <Suspense fallback={<TabsSkeleton />}><BookFilterTabs /></Suspense>
 */

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { READING_STATUS, READING_STATUS_LABEL } from '@/lib/constants';
import { ReadingStatusFilter } from '@/types/book';

/** 필터 탭 항목 정의 */
const FILTER_TABS: { value: ReadingStatusFilter; label: string }[] = [
  { value: 'all', label: READING_STATUS_LABEL[READING_STATUS.ALL] },
  { value: 'wishlist', label: READING_STATUS_LABEL[READING_STATUS.WISHLIST] },
  { value: 'reading', label: READING_STATUS_LABEL[READING_STATUS.READING] },
  { value: 'completed', label: READING_STATUS_LABEL[READING_STATUS.COMPLETED] },
];

export function BookFilterTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* 현재 선택된 필터 (없으면 '전체') */
  const currentStatus = (searchParams.get('status') as ReadingStatusFilter) || 'all';

  /* 탭 변경 시 URL 쿼리 파라미터 업데이트 */
  const handleTabChange = useCallback(
    (value: string) => {
      if (value === 'all') {
        router.push('/');
      } else {
        router.push(`/?status=${value}`);
      }
    },
    [router]
  );

  return (
    <Tabs value={currentStatus} onValueChange={handleTabChange}>
      <TabsList>
        {FILTER_TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
