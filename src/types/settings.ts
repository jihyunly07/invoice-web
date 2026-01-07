/**
 * 설정 타입 정의
 */

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  createdAt: Date;
  lastLoginAt?: Date;
}
