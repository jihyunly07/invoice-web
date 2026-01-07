/**
 * 빈 상태 컴포넌트
 * 데이터가 없을 때 표시
 */

import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  /**
   * 아이콘 컴포넌트
   */
  icon?: LucideIcon;
  /**
   * 제목
   */
  title: string;
  /**
   * 설명
   */
  description?: string;
  /**
   * 액션 버튼 텍스트
   */
  actionLabel?: string;
  /**
   * 액션 버튼 클릭 핸들러
   */
  onAction?: () => void;
  /**
   * 추가 클래스명
   */
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <Card className={cn('border-dashed', className)}>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        {Icon && (
          <div className="mb-4 rounded-full bg-muted p-3">
            <Icon className="h-6 w-6 text-muted-foreground" />
          </div>
        )}
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground max-w-md">
            {description}
          </p>
        )}
        {actionLabel && onAction && (
          <Button onClick={onAction} className="mt-4">
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
