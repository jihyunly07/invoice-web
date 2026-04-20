/**
 * 도서 카드 컴포넌트
 * 도서 목록에서 개별 도서 정보를 카드 형태로 표시
 */

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/books/status-badge';
import { RatingStars } from '@/components/books/rating-stars';
import { TagList } from '@/components/books/tag-list';
import { formatDate } from '@/lib/formatters/date';
import { Book } from '@/types/book';
import { cn } from '@/lib/utils';

interface BookCardProps {
  book: Book;
  className?: string;
}

export function BookCard({ book, className }: BookCardProps) {
  return (
    <Link
      href={`/books/${book.id}`}
      className="block h-full"
      aria-label={`${book.title} - ${book.author} 상세 보기`}
    >
      <Card
        className={cn(
          'h-full cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md',
          className
        )}
      >
        <CardHeader className="pb-3">
          {/* 제목 */}
          <CardTitle className="line-clamp-2 text-lg leading-snug">
            {book.title}
          </CardTitle>
          {/* 저자 */}
          <p className="text-sm text-muted-foreground">{book.author}</p>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          {/* 독서 상태 배지 */}
          <StatusBadge status={book.status} />

          {/* 평점 */}
          <RatingStars rating={book.rating} />

          {/* 태그 목록 */}
          <TagList tags={book.tags} />

          {/* 읽은 날짜 */}
          {book.readDate && (
            <p className="text-xs text-muted-foreground">
              {formatDate(book.readDate, 'yyyy년 M월 d일')}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
