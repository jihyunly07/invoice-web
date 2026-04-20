/**
 * 독서 상태 배지 컴포넌트
 * ReadingStatus에 따라 색상이 다른 Badge를 표시
 */

import { Badge } from '@/components/ui/badge';
import { READING_STATUS_LABEL } from '@/lib/constants';
import { ReadingStatus } from '@/types/book';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: ReadingStatus;
  className?: string;
}

/**
 * 독서 상태별 Badge variant 매핑
 * wishlist: 회색(secondary), reading: 파란색(default), completed: 초록색(outline)
 */
const STATUS_VARIANT: Record<ReadingStatus, 'secondary' | 'default' | 'outline'> = {
  wishlist: 'secondary',
  reading: 'default',
  completed: 'outline',
};

/**
 * 완독 상태 전용 추가 클래스 (초록색)
 */
const STATUS_CLASS: Partial<Record<ReadingStatus, string>> = {
  completed: 'border-green-500 text-green-600 dark:text-green-400',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      variant={STATUS_VARIANT[status]}
      className={cn(STATUS_CLASS[status], className)}
    >
      {READING_STATUS_LABEL[status]}
    </Badge>
  );
}
