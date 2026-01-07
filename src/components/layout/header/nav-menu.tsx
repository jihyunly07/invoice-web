/**
 * 네비게이션 메뉴
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAVIGATION_MENU } from '@/lib/constants';

export function NavMenu() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center space-x-6 md:flex">
      {NAVIGATION_MENU.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === item.href
              ? 'text-foreground'
              : 'text-muted-foreground'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
