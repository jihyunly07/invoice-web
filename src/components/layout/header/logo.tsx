/**
 * 로고 컴포넌트
 */

import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { config } from '@/lib/config';

export function Logo() {
  return (
    <Link href={ROUTES.HOME} className="flex items-center space-x-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <BookOpen className="h-5 w-5" />
      </div>
      <span className="hidden font-bold sm:inline-block">
        {config.app.name}
      </span>
    </Link>
  );
}
