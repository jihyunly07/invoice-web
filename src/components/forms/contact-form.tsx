/**
 * 연락처 폼 컴포넌트
 */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Textarea } from '@/components/ui/textarea';
import { contactSchema, type ContactInput } from '@/lib/validators/user';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { toast } from 'sonner';

interface ContactFormProps {
  /**
   * 제출 성공 콜백
   */
  onSuccess?: (data: ContactInput) => void;
  /**
   * 제출 실패 콜백
   */
  onError?: (error: Error) => void;
}

export function ContactForm({ onSuccess, onError }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactInput) => {
    try {
      setIsLoading(true);
      // TODO: API 호출
      console.log('연락처 데이터:', data);

      // 임시: 성공 처리
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('메시지가 전송되었습니다!', {
        description: '빠른 시일 내에 답변 드리겠습니다.',
      });

      form.reset();
      onSuccess?.(data);
    } catch (error) {
      toast.error('전송 실패', {
        description: '메시지 전송 중 오류가 발생했습니다. 다시 시도해주세요.',
      });
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
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
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input
                  placeholder="문의 제목을 입력해주세요"
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>메시지</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="문의 내용을 입력해주세요"
                  rows={6}
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <LoadingSpinner size="sm" /> : '메시지 보내기'}
        </Button>
      </form>
    </Form>
  );
}
