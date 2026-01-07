/**
 * 프로필 설정 탭 컴포넌트
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { toast } from 'sonner';
import {
  updateProfileSchema,
  changePasswordSchema,
  type UpdateProfileInput,
  type ChangePasswordInput,
} from '@/lib/validators/user';
import { getProfileApi, updateProfileApi } from '@/lib/data/mock-settings';

export function ProfileSettings() {
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);

  const profileForm = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      bio: '',
    },
  });

  const passwordForm = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await getProfileApi();
      profileForm.reset({
        name: profile.name,
        email: profile.email,
        phone: profile.phone || '',
        bio: profile.bio || '',
      });
    } catch (error) {
      toast.error('프로필 정보를 불러오는데 실패했습니다.');
    }
  };

  const onProfileSubmit = async (data: UpdateProfileInput) => {
    try {
      setIsLoadingProfile(true);
      await updateProfileApi(data);
      toast.success('프로필 정보가 업데이트되었습니다.');
    } catch (error) {
      toast.error('프로필 업데이트에 실패했습니다.', {
        description: error instanceof Error ? error.message : '다시 시도해주세요.',
      });
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const onPasswordSubmit = async (data: ChangePasswordInput) => {
    try {
      setIsLoadingPassword(true);
      // TODO: 비밀번호 변경 API 호출
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('비밀번호가 변경되었습니다.');
      passwordForm.reset();
    } catch (error) {
      toast.error('비밀번호 변경에 실패했습니다.', {
        description: error instanceof Error ? error.message : '다시 시도해주세요.',
      });
    } finally {
      setIsLoadingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 프로필 정보 */}
      <Card>
        <CardHeader>
          <CardTitle>프로필 정보</CardTitle>
          <CardDescription>
            기본 프로필 정보를 관리합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
              <FormField
                control={profileForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="홍길동"
                        {...field}
                        disabled={isLoadingProfile}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@email.com"
                        {...field}
                        disabled={isLoadingProfile}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>전화번호</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="010-1234-5678"
                        {...field}
                        disabled={isLoadingProfile}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>자기소개</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="간단한 자기소개를 입력하세요"
                        className="resize-none"
                        rows={4}
                        {...field}
                        disabled={isLoadingProfile}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoadingProfile}>
                  {isLoadingProfile ? <LoadingSpinner size="sm" /> : '저장하기'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* 비밀번호 변경 */}
      <Card>
        <CardHeader>
          <CardTitle>비밀번호 변경</CardTitle>
          <CardDescription>
            새로운 비밀번호로 변경합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>현재 비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        disabled={isLoadingPassword}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>새 비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        disabled={isLoadingPassword}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>새 비밀번호 확인</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        disabled={isLoadingPassword}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoadingPassword}>
                  {isLoadingPassword ? <LoadingSpinner size="sm" /> : '비밀번호 변경'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
