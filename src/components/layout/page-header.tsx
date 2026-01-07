/**
 * 페이지 헤더
 * 페이지 제목과 설명을 표시
 */

import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {description && (
        <p className="text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
