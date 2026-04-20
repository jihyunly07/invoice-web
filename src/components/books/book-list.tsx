/**
 * 도서 목록 컴포넌트
 * 반응형 그리드로 BookCard를 나열하고 빈 상태를 처리
 */

import { BookOpen } from 'lucide-react';
import { BookCard } from '@/components/books/book-card';
import { EmptyState } from '@/components/common/empty-state';
import { Book } from '@/types/book';

interface BookListProps {
  books: Book[];
}

export function BookList({ books }: BookListProps) {
  /* 도서가 없을 때 빈 상태 표시 */
  if (books.length === 0) {
    return (
      <EmptyState
        icon={BookOpen}
        title="등록된 책이 없습니다"
        description="Notion 데이터베이스에 책을 추가하면 여기에 표시됩니다."
      />
    );
  }

  return (
    /* 반응형 그리드: 모바일 1열 → 태블릿 2열 → 데스크톱 3열 */
    <ul
      className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3"
      aria-label={`도서 목록 (${books.length}권)`}
    >
      {books.map((book) => (
        <li key={book.id} className="h-full">
          <BookCard book={book} className="h-full" />
        </li>
      ))}
    </ul>
  );
}
