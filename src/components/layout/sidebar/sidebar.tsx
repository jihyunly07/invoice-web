/**
 * 사이드바 컴포넌트
 * 대시보드 레이아웃의 네비게이션
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Settings, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DASHBOARD_MENU } from '@/lib/constants';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

/**
 * 아이콘 이름을 실제 아이콘 컴포넌트로 매핑
 */
const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  Settings,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r bg-background md:block">
      <div className="flex h-full flex-col">
        {/* 로고 영역 */}
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <span className="text-lg font-bold">C</span>
            </div>
            <span className="text-lg">Dashboard</span>
          </Link>
        </div>

        {/* 네비게이션 */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-1">
            {DASHBOARD_MENU.map((item) => {
              const Icon = iconMap[item.icon];
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <Separator />

        {/* 푸터 영역 */}
        <div className="p-4">
          <p className="text-xs text-muted-foreground">
            © 2025 Claude Starter
          </p>
        </div>
      </div>
    </aside>
  );
}
