'use client';

/**
 * 글로벌 에러 페이지
 * 예상치 못한 에러 발생 시 표시
 */

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 로깅 (추후 Sentry 등으로 교체 가능)
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>문제가 발생했습니다</CardTitle>
          <CardDescription>
            죄송합니다. 예상치 못한 오류가 발생했습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertDescription>
              {error.message || '알 수 없는 오류가 발생했습니다.'}
            </AlertDescription>
          </Alert>
          {error.digest && (
            <p className="text-sm text-muted-foreground">
              오류 ID: {error.digest}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button onClick={reset} className="w-full">
            다시 시도
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
