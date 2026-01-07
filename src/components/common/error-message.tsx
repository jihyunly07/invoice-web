/**
 * 에러 메시지 컴포넌트
 * 에러 상황을 사용자에게 표시
 */

import { AlertCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  /**
   * 에러 제목
   */
  title?: string;
  /**
   * 에러 메시지
   */
  message: string;
  /**
   * 심각도
   * @default 'error'
   */
  severity?: 'error' | 'warning' | 'info';
  /**
   * 재시도 버튼 표시 여부
   */
  showRetry?: boolean;
  /**
   * 재시도 핸들러
   */
  onRetry?: () => void;
  /**
   * 추가 클래스명
   */
  className?: string;
}

const severityConfig = {
  error: {
    icon: XCircle,
    variant: 'destructive' as const,
    defaultTitle: '에러가 발생했습니다',
  },
  warning: {
    icon: AlertTriangle,
    variant: 'default' as const,
    defaultTitle: '주의가 필요합니다',
  },
  info: {
    icon: Info,
    variant: 'default' as const,
    defaultTitle: '알림',
  },
};

export function ErrorMessage({
  title,
  message,
  severity = 'error',
  showRetry = false,
  onRetry,
  className,
}: ErrorMessageProps) {
  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <Alert variant={config.variant} className={className}>
      <Icon className="h-4 w-4" />
      <AlertTitle>{title || config.defaultTitle}</AlertTitle>
      <AlertDescription className="mt-2">
        {message}
        {showRetry && onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="mt-3"
          >
            다시 시도
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
