/**
 * 설정 관련 유효성 검증 스키마
 * Zod를 사용한 타입 안전한 검증
 */

import { z } from 'zod';

/**
 * 알림 설정 스키마
 */
export const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
});

/**
 * 타입 추출
 */
export type NotificationSettingsInput = z.infer<typeof notificationSettingsSchema>;
