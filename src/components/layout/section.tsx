/**
 * 섹션 래퍼
 * 페이지 섹션을 구분하는 컴포넌트
 */

import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export function Section({ children, className }: SectionProps) {
  return (
    <section className={cn('py-12 sm:py-16 lg:py-20', className)}>
      {children}
    </section>
  );
}
