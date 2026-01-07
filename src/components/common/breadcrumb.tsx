/**
 * 브레드크럼 컴포넌트
 * 페이지 경로 표시
 */

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  /**
   * 표시될 텍스트
   */
  label: string;
  /**
   * 링크 경로
   */
  href?: string;
}

interface BreadcrumbProps {
  /**
   * 브레드크럼 항목들
   */
  items: BreadcrumbItem[];
  /**
   * 홈 아이콘 표시 여부
   */
  showHome?: boolean;
  /**
   * 추가 클래스명
   */
  className?: string;
}

export function Breadcrumb({
  items,
  showHome = true,
  className,
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center space-x-2 text-sm">
        {showHome && (
          <li>
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="홈"
            >
              <Home className="h-4 w-4" />
            </Link>
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center space-x-2">
              {(showHome || index > 0) && (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    isLast
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
