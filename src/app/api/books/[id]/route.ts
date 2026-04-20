/**
 * GET /api/books/[id] - 개별 도서 조회
 */

import { NextRequest, NextResponse } from 'next/server';
import type { ApiSuccessResponse, ApiErrorResponse } from '@/types/api';
import type { Book } from '@/types/book';
import { getBook } from '@/services/book.service';
import { BookNotFoundError, NotionAPIError } from '@/lib/errors';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse<ApiSuccessResponse<Book> | ApiErrorResponse>> {
  const { id } = await params;

  if (!id) {
    return NextResponse.json<ApiErrorResponse>(
      {
        success: false,
        error: { code: 'MISSING_ID', message: '도서 ID가 필요합니다.' },
      },
      { status: 400 },
    );
  }

  try {
    const book = await getBook(id);

    return NextResponse.json<ApiSuccessResponse<Book>>({
      success: true,
      data: book,
    });
  } catch (error) {
    if (error instanceof BookNotFoundError) {
      return NextResponse.json<ApiErrorResponse>(
        {
          success: false,
          error: { code: 'NOT_FOUND', message: error.message },
        },
        { status: 404 },
      );
    }

    if (error instanceof NotionAPIError) {
      return NextResponse.json<ApiErrorResponse>(
        {
          success: false,
          error: {
            code: error.code ?? 'NOTION_ERROR',
            message: error.message,
          },
        },
        { status: error.status ?? 500 },
      );
    }

    console.error(`[GET /api/books/${id}]`, error);
    return NextResponse.json<ApiErrorResponse>(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: '서버 오류가 발생했습니다.' },
      },
      { status: 500 },
    );
  }
}
