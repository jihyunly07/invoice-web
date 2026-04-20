'use client';

/**
 * 글로벌 에러 페이지
 * 예상치 못한 에러 발생 시 표시
 * 에러 타입에 따른 사용자 친화적 메시지 제공
 */

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, WifiOff, Clock } from 'lucide-react';

/** 에러 타입에 따라 아이콘/제목/설명 결정 */
function getErrorDisplay(error: Error) {
  if (error.name === 'RateLimitError') {
    return {
      icon: Clock,
      title: 'API 요청 한도 초과',
      description: 'Notion API 요청 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.',
    };
  }
  if (error.name === 'NetworkError' || error.message.toLowerCase().includes('network')) {
    return {
      icon: WifiOff,
      title: '네트워크 연결 실패',
      description: '인터넷 연결을 확인하고 다시 시도해 주세요.',
    };
  }
  return {
    icon: AlertTriangle,
    title: '문제가 발생했습니다',
    description: '죄송합니다. 예상치 못한 오류가 발생했습니다.',
  };
}

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

  const { icon: Icon, title, description } = getErrorDisplay(error);

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4"
      role="alert"
      aria-live="assertive"
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Icon className="h-6 w-6 text-destructive" aria-hidden="true" />
            <CardTitle>{title}</CardTitle>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
            aria-label="오류 상세 내용"
          >
            {error.message || '알 수 없는 오류가 발생했습니다.'}
          </div>
          {error.digest && (
            <p className="text-sm text-muted-foreground">
              오류 ID: <code>{error.digest}</code>
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={reset} className="w-full gap-2">
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            다시 시도
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
