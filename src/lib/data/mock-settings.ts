/**
 * 설정 목 데이터 및 API 시뮬레이션
 */

import type { UserProfile, NotificationSettings } from '@/types/settings';
import type { NotificationSettingsInput } from '@/lib/validators/settings';
import type { UpdateProfileInput } from '@/lib/validators/user';

/**
 * 목 사용자 프로필 데이터
 */
let mockProfile: UserProfile = {
  id: '1',
  name: '김철수',
  email: 'kim.cs@example.com',
  phone: '010-1234-5678',
  bio: '프론트엔드 개발자입니다. React와 TypeScript를 주로 사용합니다.',
  createdAt: new Date('2024-01-15'),
  lastLoginAt: new Date(),
};

/**
 * 목 알림 설정 데이터
 */
let mockNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  marketingEmails: false,
};

/**
 * API 응답 지연 시뮬레이션
 */
const delay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 프로필 조회 API
 */
export async function getProfileApi(): Promise<UserProfile> {
  await delay();
  return { ...mockProfile };
}

/**
 * 프로필 업데이트 API
 */
export async function updateProfileApi(input: UpdateProfileInput): Promise<UserProfile> {
  await delay();

  mockProfile = {
    ...mockProfile,
    name: input.name,
    email: input.email,
    phone: input.phone,
    bio: input.bio,
  };

  return { ...mockProfile };
}

/**
 * 알림 설정 조회 API
 */
export async function getNotificationSettingsApi(): Promise<NotificationSettings> {
  await delay();
  return { ...mockNotificationSettings };
}

/**
 * 알림 설정 업데이트 API
 */
export async function updateNotificationSettingsApi(
  input: NotificationSettingsInput
): Promise<NotificationSettings> {
  await delay();

  mockNotificationSettings = {
    emailNotifications: input.emailNotifications,
    pushNotifications: input.pushNotifications,
    marketingEmails: input.marketingEmails,
  };

  return { ...mockNotificationSettings };
}
