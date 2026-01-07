/**
 * 설정 페이지
 */

'use client';

import { Container } from '@/components/layout/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileSettings } from './_components/profile-settings';
import { NotificationSettings } from './_components/notification-settings';

export default function SettingsPage() {
  return (
    <Container className="py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">설정</h1>
          <p className="text-muted-foreground mt-2">
            계정 및 시스템 설정을 관리합니다.
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">프로필</TabsTrigger>
            <TabsTrigger value="notifications">알림</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <ProfileSettings />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <NotificationSettings />
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}
