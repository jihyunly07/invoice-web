/**
 * 인증 레이아웃
 * 로그인, 회원가입 등 인증 페이지용 레이아웃
 * 중앙 정렬, 헤더/푸터 없음
 */

import Link from 'next/link';
import { ThemeToggle } from '@/components/common/theme-toggle';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 상단 로고 및 테마 토글 */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <span className="text-lg font-bold">C</span>
            </div>
            <span className="text-lg">Claude Starter</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* 푸터 */}
      <footer className="border-t py-6">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          © 2025 Claude Starter. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
