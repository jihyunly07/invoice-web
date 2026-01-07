/**
 * 통계 카드 컴포넌트
 * 주요 지표를 시각적으로 표시
 */

import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  /**
   * 카드 제목
   */
  title: string;
  /**
   * 주요 값
   */
  value: string | number;
  /**
   * 변화율 또는 부가 설명
   */
  description?: string;
  /**
   * 아이콘
   */
  icon?: LucideIcon;
  /**
   * 변화율 (양수: 증가, 음수: 감소)
   */
  trend?: number;
  /**
   * 추가 클래스명
   */
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
}: StatCardProps) {
  const trendColor = trend
    ? trend > 0
      ? 'text-green-600 dark:text-green-400'
      : 'text-red-600 dark:text-red-400'
    : undefined;

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {Icon && (
          <Icon className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className={cn('text-xs', trendColor || 'text-muted-foreground')}>
            {trend !== undefined && (
              <span className="mr-1">
                {trend > 0 ? '↑' : trend < 0 ? '↓' : ''}
                {Math.abs(trend)}%
              </span>
            )}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
