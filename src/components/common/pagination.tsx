/**
 * 페이지네이션 컴포넌트
 * 범용 페이지 네비게이션
 */

'use client';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaginationProps {
  /**
   * 현재 페이지 (1부터 시작)
   */
  currentPage: number;
  /**
   * 전체 페이지 수
   */
  totalPages: number;
  /**
   * 페이지 변경 핸들러
   */
  onPageChange: (page: number) => void;
  /**
   * 양옆에 표시할 페이지 번호 개수
   */
  siblingCount?: number;
  /**
   * 추가 클래스명
   */
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  /**
   * 표시할 페이지 번호 배열 생성
   */
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    // 총 페이지가 7개 이하면 모두 표시
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // 첫 페이지는 항상 표시
    pages.push(1);

    // 시작 페이지 계산
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - 1);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      // 왼쪽 생략 없음, 오른쪽 생략 있음
      for (let i = 2; i <= Math.min(5, totalPages - 1); i++) {
        pages.push(i);
      }
      pages.push('...');
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      // 왼쪽 생략 있음, 오른쪽 생략 없음
      pages.push('...');
      for (let i = Math.max(totalPages - 4, 2); i <= totalPages - 1; i++) {
        pages.push(i);
      }
    } else if (shouldShowLeftDots && shouldShowRightDots) {
      // 양쪽 생략 있음
      pages.push('...');
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        pages.push(i);
      }
      pages.push('...');
    } else {
      // 양쪽 생략 없음
      for (let i = 2; i <= totalPages - 1; i++) {
        pages.push(i);
      }
    }

    // 마지막 페이지는 항상 표시
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      className={cn('flex items-center justify-center space-x-2', className)}
      aria-label="페이지네이션"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="첫 페이지"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-4 text-muted-foreground"
            >
              ...
            </span>
          );
        }

        return (
          <Button
            key={page}
            variant={currentPage === page ? 'default' : 'outline'}
            size="icon"
            onClick={() => onPageChange(page as number)}
            aria-label={`페이지 ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="마지막 페이지"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
