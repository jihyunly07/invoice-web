/**
 * 사용자 테이블 컬럼 정의
 */

'use client';

import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/types/user';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface UserColumnsProps {
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export const createUserColumns = ({ onEdit, onDelete }: UserColumnsProps): ColumnDef<User>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          이름
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{user.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: '이메일',
    cell: ({ row }) => {
      return <span className="text-muted-foreground">{row.original.email}</span>;
    },
  },
  {
    accessorKey: 'role',
    header: '역할',
    cell: ({ row }) => {
      const roleLabels: Record<string, string> = {
        admin: '관리자',
        user: '사용자',
        moderator: '중재자',
      };
      const roleVariants: Record<string, 'default' | 'secondary' | 'outline'> = {
        admin: 'default',
        user: 'secondary',
        moderator: 'outline',
      };
      const role = row.original.role;
      return <Badge variant={roleVariants[role]}>{roleLabels[role]}</Badge>;
    },
  },
  {
    accessorKey: 'status',
    header: '상태',
    cell: ({ row }) => {
      const statusLabels: Record<string, string> = {
        active: '활성',
        inactive: '비활성',
        suspended: '정지',
      };
      const statusVariants: Record<string, 'default' | 'secondary' | 'destructive'> = {
        active: 'default',
        inactive: 'secondary',
        suspended: 'destructive',
      };
      const status = row.original.status;
      return <Badge variant={statusVariants[status]}>{statusLabels[status]}</Badge>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          가입일
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-sm text-muted-foreground">
          {format(row.original.createdAt, 'yyyy-MM-dd', { locale: ko })}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: '작업',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(user)}
            title="수정"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(user.id)}
            title="삭제"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      );
    },
  },
];
