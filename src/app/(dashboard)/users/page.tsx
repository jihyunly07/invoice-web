/**
 * 사용자 관리 페이지
 */

'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/layout/container';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DataTable } from '@/components/tables/data-table';
import { createUserColumns } from './_components/user-columns';
import { UserDialog } from './_components/user-dialog';
import { getUsersApi, deleteUserApi } from '@/lib/data/mock-users';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import type { User } from '@/types/user';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsersApi();
      setUsers(data);
    } catch (error) {
      toast.error('사용자 목록을 불러오는데 실패했습니다.', {
        description: error instanceof Error ? error.message : '다시 시도해주세요.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAddUser = () => {
    setEditingUser(null);
    setDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setDialogOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    if (!confirm(`${user.name} 사용자를 정말 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await deleteUserApi(userId);
      toast.success('사용자가 삭제되었습니다.');
      loadUsers();
    } catch (error) {
      toast.error('사용자 삭제에 실패했습니다.', {
        description: error instanceof Error ? error.message : '다시 시도해주세요.',
      });
    }
  };

  const handleDialogClose = (shouldRefresh: boolean) => {
    setDialogOpen(false);
    setEditingUser(null);
    if (shouldRefresh) {
      loadUsers();
    }
  };

  const columns = createUserColumns({
    onEdit: handleEditUser,
    onDelete: handleDeleteUser,
  });

  return (
    <Container className="py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">사용자 관리</h1>
            <p className="text-muted-foreground mt-2">
              시스템 사용자를 관리합니다.
            </p>
          </div>
          <Button onClick={handleAddUser}>
            <Plus className="mr-2 h-4 w-4" />
            사용자 추가
          </Button>
        </div>

        <Card className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={users}
              searchKey="name"
              searchPlaceholder="이름 또는 이메일로 검색..."
            />
          )}
        </Card>
      </div>

      <UserDialog
        open={dialogOpen}
        user={editingUser}
        onClose={handleDialogClose}
      />
    </Container>
  );
}
