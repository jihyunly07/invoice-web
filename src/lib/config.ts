/**
 * 애플리케이션 설정
 */

export const config = {
  app: {
    name: 'Claude Next.js Starter',
    description: '모던 웹 스타터킷 - Next.js 15, React 19, TypeScript, Tailwind CSS v4',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 10000, // 10초
  },
} as const;
