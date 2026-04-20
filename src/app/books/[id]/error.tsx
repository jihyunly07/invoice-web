'use client';

/**
 * 도서 상세 페이지 에러 상태
 * 도서 조회 중 예외 발생 시 표시
 */

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BackButton } from '@/components/common/back-button';

export default function BookDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('BookDetailError:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>도서를 불러올 수 없습니다</CardTitle>
          <CardDescription>
            죄송합니다. 도서 정보를 가져오는 중 오류가 발생했습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {error.message || '알 수 없는 오류가 발생했습니다.'}
          </div>
          {error.digest && (
            <p className="mt-2 text-sm text-muted-foreground">
              오류 ID: {error.digest}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex gap-2">
          <BackButton label="목록으로" />
          <Button onClick={reset} className="flex-1">
            다시 시도
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
