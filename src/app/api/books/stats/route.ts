/**
 * GET /api/books/stats - 도서 통계 조회
 */

import { NextResponse } from 'next/server';
import type { ApiSuccessResponse, ApiErrorResponse } from '@/types/api';
import type { BookStats } from '@/services/book.service';
import { getBookStats } from '@/services/book.service';
import { NotionAPIError } from '@/lib/errors';

export async function GET(): Promise<NextResponse<ApiSuccessResponse<BookStats> | ApiErrorResponse>> {
  try {
    const stats = await getBookStats();

    return NextResponse.json<ApiSuccessResponse<BookStats>>({
      success: true,
      data: stats,
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

    console.error('[GET /api/books/stats]', error);
    return NextResponse.json<ApiErrorResponse>(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: '서버 오류가 발생했습니다.' },
      },
      { status: 500 },
    );
  }
}
