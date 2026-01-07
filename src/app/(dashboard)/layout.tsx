/**
 * 대시보드 레이아웃
 * 사이드바 + 메인 콘텐츠 구조
 */

import { Sidebar } from '@/components/layout/sidebar/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
