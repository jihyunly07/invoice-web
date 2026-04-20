/**
 * 도서 상세 페이지
 * Server Component - 동적 라우트 /books/[id]
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BookDetail } from '@/components/books/book-detail';
import { Book } from '@/types/book';

/**
 * 도서 단건 조회 (Phase 0 완료 후 실제 Repository 연동)
 * TODO: import { getBookById } from '@/repositories/book-repository'
 */
async function getBookById(_id: string): Promise<Book | null> {
  return null;
}

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  /* Next.js 15: params는 Promise */
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    return { title: '도서를 찾을 수 없습니다' };
  }

  return {
    title: book.title,
    description: book.review ?? `${book.author}의 도서`,
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;
  const book = await getBookById(id);

  /* 도서가 없으면 404 */
  if (!book) {
    notFound();
  }

  return <BookDetail book={book} />;
}
