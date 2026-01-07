/**
 * 날짜 선택 컴포넌트
 * Popover + Calendar 조합
 */

'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  /**
   * 선택된 날짜
   */
  date?: Date;
  /**
   * 날짜 선택 핸들러
   */
  onSelect?: (date: Date | undefined) => void;
  /**
   * 플레이스홀더 텍스트
   */
  placeholder?: string;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
  /**
   * 추가 클래스명
   */
  className?: string;
}

export function DatePicker({
  date,
  onSelect,
  placeholder = '날짜 선택',
  disabled = false,
  className,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP', { locale: ko }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
