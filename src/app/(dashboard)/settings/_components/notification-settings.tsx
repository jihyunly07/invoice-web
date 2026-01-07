/**
 * 알림 설정 탭 컴포넌트
 */

'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { toast } from 'sonner';
import {
  notificationSettingsSchema,
  type NotificationSettingsInput,
} from '@/lib/validators/settings';
import {
  getNotificationSettingsApi,
  updateNotificationSettingsApi,
} from '@/lib/data/mock-settings';

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<NotificationSettingsInput>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
    },
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await getNotificationSettingsApi();
      form.reset(settings);
    } catch (error) {
      toast.error('알림 설정을 불러오는데 실패했습니다.');
    }
  };

  const onSubmit = async (data: NotificationSettingsInput) => {
    try {
      setIsLoading(true);
      await updateNotificationSettingsApi(data);
      toast.success('알림 설정이 저장되었습니다.');
    } catch (error) {
      toast.error('알림 설정 저장에 실패했습니다.', {
        description: error instanceof Error ? error.message : '다시 시도해주세요.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>알림 설정</CardTitle>
        <CardDescription>
          받을 알림을 선택합니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="emailNotifications"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="cursor-pointer">
                      이메일 알림
                    </FormLabel>
                    <FormDescription>
                      중요한 업데이트와 활동에 대한 이메일을 받습니다.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pushNotifications"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="cursor-pointer">
                      푸시 알림
                    </FormLabel>
                    <FormDescription>
                      실시간 알림을 브라우저나 기기로 받습니다.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marketingEmails"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="cursor-pointer">
                      마케팅 이메일
                    </FormLabel>
                    <FormDescription>
                      새로운 기능, 팁, 프로모션에 대한 이메일을 받습니다.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <LoadingSpinner size="sm" /> : '저장하기'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
