/**
 * GET /api/books - 도서 목록 조회
 * Query params: status, search, tags (comma-separated)
 */

import { NextRequest, NextResponse } from 'next/server';
import type { ApiSuccessResponse, ApiErrorResponse } from '@/types/api';
import type { Book, ReadingStatusFilter } from '@/types/book';
import { getBooks } from '@/services/book.service';
import { NotionAPIError } from '@/lib/errors';
import { READING_STATUS } from '@/lib/constants';

const VALID_STATUSES = Object.values(READING_STATUS) as string[];

export async function GET(request: NextRequest): Promise<NextResponse<ApiSuccessResponse<Book[]> | ApiErrorResponse>> {
  const { searchParams } = request.nextUrl;

  const statusParam = searchParams.get('status') ?? 'all';
  const search = searchParams.get('search') ?? undefined;
  const tagsParam = searchParams.get('tags');

  // status 파라미터 검증
  if (!VALID_STATUSES.includes(statusParam)) {
    return NextResponse.json<ApiErrorResponse>(
      {
        success: false,
        error: {
          code: 'INVALID_STATUS',
          message: `유효하지 않은 status 값입니다. 허용값: ${VALID_STATUSES.join(', ')}`,
        },
      },
      { status: 400 },
    );
  }

  const tags = tagsParam ? tagsParam.split(',').map((t) => t.trim()).filter(Boolean) : undefined;

  try {
    const books = await getBooks({
      status: statusParam as ReadingStatusFilter,
      search,
      tags,
    });

    return NextResponse.json<ApiSuccessResponse<Book[]>>({
      success: true,
      data: books,
    });
  } catch (error) {
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

    console.error('[GET /api/books]', error);
    return NextResponse.json<ApiErrorResponse>(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: '서버 오류가 발생했습니다.' },
      },
      { status: 500 },
    );
  }
}
