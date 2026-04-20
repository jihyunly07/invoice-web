/**
 * 평점 별 표시 컴포넌트
 * 0-5점 범위의 평점을 별 아이콘으로 시각화
 */

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  /** 평점 (0-5, null이면 미평가) */
  rating: number | null;
  /** 최대 별 개수 (기본: 5) */
  max?: number;
  /** 별 아이콘 크기 클래스 (기본: h-4 w-4) */
  sizeClass?: string;
  className?: string;
}

export function RatingStars({
  rating,
  max = 5,
  sizeClass = 'h-4 w-4',
  className,
}: RatingStarsProps) {
  /* 평점 미기록 시 텍스트로 표시 */
  if (rating === null) {
    return (
      <span className={cn('text-sm text-muted-foreground', className)}>
        평점 없음
      </span>
    );
  }

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: max }, (_, index) => (
        <Star
          key={index}
          className={cn(
            sizeClass,
            index < rating
              ? 'fill-yellow-400 text-yellow-400'  // 채워진 별
              : 'text-muted-foreground'              // 빈 별
          )}
        />
      ))}
      <span className="ml-1 text-sm text-muted-foreground">
        {rating}/{max}
      </span>
    </div>
  );
}
