/**
 * 사용자 관련 유효성 검증 스키마
 * Zod를 사용한 타입 안전한 검증
 */

import { z } from 'zod';

/**
 * 프로필 업데이트 스키마
 */
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요.')
    .min(2, '이름은 최소 2자 이상이어야 합니다.')
    .max(50, '이름은 최대 50자까지 입력 가능합니다.'),
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
  bio: z
    .string()
    .max(500, '자기소개는 최대 500자까지 입력 가능합니다.')
    .optional(),
  phone: z
    .string()
    .regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, '올바른 전화번호 형식이 아닙니다.')
    .optional()
    .or(z.literal('')),
});

/**
 * 비밀번호 변경 스키마
 */
export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, '현재 비밀번호를 입력해주세요.'),
  newPassword: z
    .string()
    .min(1, '새 비밀번호를 입력해주세요.')
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다.'
    ),
  confirmNewPassword: z
    .string()
    .min(1, '새 비밀번호 확인을 입력해주세요.'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['confirmNewPassword'],
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: '새 비밀번호는 현재 비밀번호와 달라야 합니다.',
  path: ['newPassword'],
});

/**
 * 연락처 폼 스키마
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요.')
    .min(2, '이름은 최소 2자 이상이어야 합니다.'),
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
  subject: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .max(100, '제목은 최대 100자까지 입력 가능합니다.'),
  message: z
    .string()
    .min(1, '메시지를 입력해주세요.')
    .min(10, '메시지는 최소 10자 이상이어야 합니다.')
    .max(1000, '메시지는 최대 1000자까지 입력 가능합니다.'),
});

/**
 * 사용자 생성 스키마
 */
export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요.')
    .min(2, '이름은 최소 2자 이상이어야 합니다.')
    .max(50, '이름은 최대 50자까지 입력 가능합니다.'),
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
  role: z.enum(['admin', 'user', 'moderator'], {
    errorMap: () => ({ message: '올바른 역할을 선택해주세요.' }),
  }),
  status: z.enum(['active', 'inactive', 'suspended']).default('active'),
});

/**
 * 타입 추출
 */
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
