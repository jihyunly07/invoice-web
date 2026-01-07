/**
 * 검색 입력 컴포넌트
 * 검색 기능이 필요한 곳에 사용
 */

'use client';

import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  /**
   * 입력 값
   */
  value: string;
  /**
   * 값 변경 핸들러
   */
  onChange: (value: string) => void;
  /**
   * 플레이스홀더
   * @default '검색...'
   */
  placeholder?: string;
  /**
   * 추가 클래스명
   */
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = '검색...',
  className,
}: SearchInputProps) {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 pr-9"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
          aria-label="검색어 지우기"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
