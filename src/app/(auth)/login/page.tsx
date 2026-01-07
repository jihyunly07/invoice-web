/**
 * 로그인 페이지
 */

'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/components/forms/login-form';
import { toast } from 'sonner';
import { ROUTES } from '@/lib/constants';
import type { LoginInput } from '@/lib/validators/auth';

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = (data: LoginInput) => {
    toast.success('로그인 성공!', {
      description: `${data.email}로 로그인되었습니다.`,
    });

    // TODO: 실제 인증 처리 후 리다이렉트
    setTimeout(() => {
      router.push(ROUTES.DASHBOARD);
    }, 1000);
  };

  const handleLoginError = (error: Error) => {
    toast.error('로그인 실패', {
      description: error.message || '로그인 중 오류가 발생했습니다.',
    });
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">로그인</CardTitle>
        <CardDescription className="text-center">
          계정에 로그인하여 서비스를 이용하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </CardContent>
    </Card>
  );
}
