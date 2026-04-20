/**
 * 도서 상세 페이지
 * Server Component - 동적 라우트 /books/[id]
 * ISR: 60초마다 재검증
 */

export const revalidate = 60;

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BookDetail } from '@/components/books/book-detail';
import { getAllBooks, getBookById } from '@/repositories/book.repository';
import { BookNotFoundError } from '@/lib/errors';

/**
 * 빌드 시 정적 경로 생성 (ISG)
 * 모든 도서 ID를 미리 생성하여 첫 방문 시 빠른 응답 제공
 */
export async function generateStaticParams() {
  try {
    const books = await getAllBooks();
    return books.map((book) => ({ id: book.id }));
  } catch {
    // 빌드 시 Notion API 실패해도 빌드는 성공하도록 빈 배열 반환
    return [];
  }
}

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  /* Next.js 15: params는 Promise */
  const { id } = await params;

  try {
    const book = await getBookById(id);
    return {
      title: book.title,
      description: book.review ?? `${book.author}의 도서`,
    };
  } catch {
    return { title: '도서를 찾을 수 없습니다' };
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;

  try {
    const book = await getBookById(id);
    return <BookDetail book={book} />;
  } catch (error) {
    if (error instanceof BookNotFoundError) {
      notFound();
    }
    throw error;
  }
}
