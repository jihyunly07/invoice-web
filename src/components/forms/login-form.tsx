/**
 * 로그인 폼 컴포넌트
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { loginSchema, type LoginInput } from '@/lib/validators/auth';
import { ROUTES } from '@/lib/constants';
import { LoadingSpinner } from '@/components/common/loading-spinner';

interface LoginFormProps {
  /**
   * 로그인 성공 콜백
   */
  onSuccess?: (data: LoginInput) => void;
  /**
   * 로그인 실패 콜백
   */
  onError?: (error: Error) => void;
}

export function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      setIsLoading(true);
      // TODO: API 호출
      console.log('로그인 데이터:', data);

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
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormLabel className="!mt-0 cursor-pointer font-normal">
                  로그인 상태 유지
                </FormLabel>
              </FormItem>
            )}
          />

          <Link
            href="#"
            className="text-sm text-primary hover:underline"
          >
            비밀번호 찾기
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <LoadingSpinner size="sm" /> : '로그인'}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          계정이 없으신가요?{' '}
          <Link href={ROUTES.REGISTER} className="text-primary hover:underline">
            회원가입
          </Link>
        </p>
      </form>
    </Form>
  );
}
