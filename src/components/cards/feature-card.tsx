/**
 * 기능 카드 컴포넌트
 * 제품 기능을 시각적으로 표시
 */

import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  /**
   * 기능 제목
   */
  title: string;
  /**
   * 기능 설명
   */
  description: string;
  /**
   * 아이콘
   */
  icon?: LucideIcon;
  /**
   * 아이콘 색상 (Tailwind 클래스)
   */
  iconColor?: string;
  /**
   * 추가 내용 (리스트 등)
   */
  children?: React.ReactNode;
  /**
   * 추가 클래스명
   */
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  iconColor = 'text-primary',
  children,
  className,
}: FeatureCardProps) {
  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <CardHeader>
        {Icon && (
          <div className="mb-4 inline-flex">
            <div className={cn('rounded-lg bg-primary/10 p-3', iconColor)}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
        )}
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {children && (
        <CardContent>
          {children}
        </CardContent>
      )}
    </Card>
  );
}
