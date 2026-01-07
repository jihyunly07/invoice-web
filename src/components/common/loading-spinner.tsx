/**
 * 로딩 스피너 컴포넌트
 * 데이터 로딩 중 표시
 */

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  /**
   * 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * 텍스트 표시 여부
   */
  text?: string;
  /**
   * 추가 클래스명
   */
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export function LoadingSpinner({
  size = 'md',
  text,
  className,
}: LoadingSpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-2', className)}>
      <Loader2 className={cn('animate-spin text-primary', sizeClasses[size])} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}
