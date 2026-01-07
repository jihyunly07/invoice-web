/**
 * 회원가입 페이지
 */

'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RegisterForm } from '@/components/forms/register-form';
import { toast } from 'sonner';
import { ROUTES } from '@/lib/constants';
import type { RegisterInput } from '@/lib/validators/auth';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegisterSuccess = (data: RegisterInput) => {
    toast.success('회원가입 완료!', {
      description: '로그인 페이지로 이동합니다.',
    });

    // TODO: 실제 회원가입 처리 후 리다이렉트
    setTimeout(() => {
      router.push(ROUTES.LOGIN);
    }, 1500);
  };

  const handleRegisterError = (error: Error) => {
    toast.error('회원가입 실패', {
      description: error.message || '회원가입 중 오류가 발생했습니다.',
    });
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">회원가입</CardTitle>
        <CardDescription className="text-center">
          새 계정을 만들어 서비스를 시작하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm
          onSuccess={handleRegisterSuccess}
          onError={handleRegisterError}
        />
      </CardContent>
    </Card>
  );
}
