/**
 * 사용자 목 데이터 및 API 시뮬레이션
 */

import type { User, UserRole, UserStatus } from '@/types/user';
import type { CreateUserInput } from '@/lib/validators/user';

/**
 * 목 사용자 데이터
 */
let mockUsers: User[] = [
  {
    id: '1',
    name: '김철수',
    email: 'kim.cs@example.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kim',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: '이영희',
    email: 'lee.yh@example.com',
    role: 'user',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lee',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    name: '박민수',
    email: 'park.ms@example.com',
    role: 'moderator',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=park',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    name: '최지은',
    email: 'choi.je@example.com',
    role: 'user',
    status: 'inactive',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=choi',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: '5',
    name: '정우성',
    email: 'jung.ws@example.com',
    role: 'user',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jung',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: '6',
    name: '강동원',
    email: 'kang.dw@example.com',
    role: 'moderator',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kang',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
  {
    id: '7',
    name: '송혜교',
    email: 'song.hk@example.com',
    role: 'user',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=song',
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-05'),
  },
  {
    id: '8',
    name: '전지현',
    email: 'jeon.jh@example.com',
    role: 'user',
    status: 'suspended',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jeon',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-15'),
  },
  {
    id: '9',
    name: '이병헌',
    email: 'lee.bh@example.com',
    role: 'user',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=leebh',
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    id: '10',
    name: '김태희',
    email: 'kim.th@example.com',
    role: 'user',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kimth',
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-04-01'),
  },
  {
    id: '11',
    name: '현빈',
    email: 'hyun.b@example.com',
    role: 'moderator',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hyun',
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date('2024-04-05'),
  },
  {
    id: '12',
    name: '손예진',
    email: 'son.yj@example.com',
    role: 'user',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=son',
    createdAt: new Date('2024-04-10'),
    updatedAt: new Date('2024-04-10'),
  },
  {
    id: '13',
    name: '공유',
    email: 'gong.y@example.com',
    role: 'user',
    status: 'inactive',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gong',
    createdAt: new Date('2024-04-15'),
    updatedAt: new Date('2024-04-15'),
  },
  {
    id: '14',
    name: '배수지',
    email: 'bae.sj@example.com',
    role: 'user',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bae',
    createdAt: new Date('2024-04-20'),
    updatedAt: new Date('2024-04-20'),
  },
  {
    id: '15',
    name: '박서준',
    email: 'park.sj@example.com',
    role: 'user',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=parksj',
    createdAt: new Date('2024-04-25'),
    updatedAt: new Date('2024-04-25'),
  },
  {
    id: '16',
    name: '아이유',
    email: 'iu@example.com',
    role: 'user',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=iu',
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date('2024-05-01'),
  },
  {
    id: '17',
    name: '이종석',
    email: 'lee.js@example.com',
    role: 'user',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=leejs',
    createdAt: new Date('2024-05-05'),
    updatedAt: new Date('2024-05-05'),
  },
  {
    id: '18',
    name: '한지민',
    email: 'han.jm@example.com',
    role: 'user',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=han',
    createdAt: new Date('2024-05-10'),
    updatedAt: new Date('2024-05-10'),
  },
  {
    id: '19',
    name: '조인성',
    email: 'jo.is@example.com',
    role: 'user',
    status: 'inactive',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jo',
    createdAt: new Date('2024-05-15'),
    updatedAt: new Date('2024-05-15'),
  },
  {
    id: '20',
    name: '한효주',
    email: 'han.hj@example.com',
    role: 'user',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hanhj',
    createdAt: new Date('2024-05-20'),
    updatedAt: new Date('2024-05-20'),
  },
];

/**
 * API 응답 지연 시뮬레이션
 */
const delay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 사용자 목록 조회 API
 */
export async function getUsersApi(): Promise<User[]> {
  await delay();
  return [...mockUsers];
}

/**
 * 사용자 생성 API
 */
export async function createUserApi(input: CreateUserInput): Promise<User> {
  await delay();

  const newUser: User = {
    id: String(mockUsers.length + 1),
    name: input.name,
    email: input.email,
    role: input.role as UserRole,
    status: input.status as UserStatus,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${input.name}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  mockUsers.push(newUser);
  return newUser;
}

/**
 * 사용자 수정 API
 */
export async function updateUserApi(id: string, input: Partial<CreateUserInput>): Promise<User> {
  await delay();

  const userIndex = mockUsers.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }

  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...input,
    updatedAt: new Date(),
  };

  return mockUsers[userIndex];
}

/**
 * 사용자 삭제 API
 */
export async function deleteUserApi(id: string): Promise<void> {
  await delay();

  const userIndex = mockUsers.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }

  mockUsers.splice(userIndex, 1);
}
