/**
 * 도서 상세 정보 컴포넌트
 * Book 데이터를 받아 상세 정보를 카드 형태로 표시
 */

import { CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Container } from '@/components/layout/container';
import { StatusBadge } from '@/components/books/status-badge';
import { RatingStars } from '@/components/books/rating-stars';
import { TagList } from '@/components/books/tag-list';
import { BackButton } from '@/components/common/back-button';
import { formatDate } from '@/lib/formatters/date';
import { Book } from '@/types/book';

interface BookDetailProps {
  book: Book;
}

export function BookDetail({ book }: BookDetailProps) {
  return (
    <Container className="py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <BackButton label="목록으로" />

        <Card>
          <CardHeader className="space-y-4">
            {/* 제목 & 저자 */}
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {book.title}
              </h1>
              <p className="text-lg text-muted-foreground">{book.author}</p>
            </div>

            {/* 독서 상태 배지 */}
            <StatusBadge status={book.status} />
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 평점 */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground" id="rating-label">평점</p>
              <RatingStars rating={book.rating} sizeClass="h-5 w-5" />
            </div>

            {/* 읽은 날짜 */}
            {book.readDate && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">읽은 날짜</p>
                <div className="flex items-center gap-2 text-sm">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <time dateTime={book.readDate}>
                    {formatDate(book.readDate, 'yyyy년 MM월 dd일')}
                  </time>
                </div>
              </div>
            )}

            {/* 태그 */}
            {book.tags.length > 0 && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">태그</p>
                <TagList tags={book.tags} />
              </div>
            )}

            {/* 한줄평 */}
            {book.review && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground" id="review-label">한줄평</p>
                <blockquote
                  className="rounded-lg bg-muted px-4 py-3 text-sm leading-relaxed"
                  aria-labelledby="review-label"
                >
                  {book.review}
                </blockquote>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
