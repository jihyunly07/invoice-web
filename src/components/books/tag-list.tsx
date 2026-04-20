/**
 * 태그 목록 컴포넌트
 * 도서에 연결된 태그들을 Badge로 나열
 */

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TagListProps {
  tags: string[];
  className?: string;
}

export function TagList({ tags, className }: TagListProps) {
  /* 태그가 없으면 렌더링 생략 */
  if (tags.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap gap-1', className)}>
      {tags.map((tag) => (
        <Badge key={tag} variant="outline" className="text-xs">
          {tag}
        </Badge>
      ))}
    </div>
  );
}
