/**
 * 사용자 타입 정의
 */

export type UserRole = 'admin' | 'user' | 'moderator';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}
