/**
 * 데이터 테이블 툴바 컴포넌트
 * 검색, 필터, 뷰 옵션 제공
 */

'use client';

import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  /**
   * 검색 컬럼 키
   */
  searchKey: string;
  /**
   * 검색 플레이스홀더
   */
  searchPlaceholder?: string;
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = '검색...',
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={searchPlaceholder}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="h-9 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-9 px-2 lg:px-3"
          >
            초기화
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
