/**
 * 회원가입 폼 컴포넌트
 */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { registerSchema, type RegisterInput } from '@/lib/validators/auth';
import { ROUTES } from '@/lib/constants';
import { LoadingSpinner } from '@/components/common/loading-spinner';

interface RegisterFormProps {
  /**
   * 회원가입 성공 콜백
   */
  onSuccess?: (data: RegisterInput) => void;
  /**
   * 회원가입 실패 콜백
   */
  onError?: (error: Error) => void;
}

export function RegisterForm({ onSuccess, onError }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      setIsLoading(true);
      // TODO: API 호출
      console.log('회원가입 데이터:', data);

      // 임시: 성공 콜백
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSuccess?.(data);
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input
                  placeholder="홍길동"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormDescription>
                대문자, 소문자, 숫자를 포함한 8자 이상
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호 확인</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agreeToTerms"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer font-normal">
                  <Link href="#" className="text-primary hover:underline">
                    이용약관
                  </Link>
                  {' '}및{' '}
                  <Link href="#" className="text-primary hover:underline">
                    개인정보처리방침
                  </Link>
                  에 동의합니다
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <LoadingSpinner size="sm" /> : '회원가입'}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          이미 계정이 있으신가요?{' '}
          <Link href={ROUTES.LOGIN} className="text-primary hover:underline">
            로그인
          </Link>
        </p>
      </form>
    </Form>
  );
}
