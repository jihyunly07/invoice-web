/**
 * 사용자 추가/수정 다이얼로그
 */

'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UserForm } from '@/components/forms/user-form';
import { createUserApi, updateUserApi } from '@/lib/data/mock-users';
import { toast } from 'sonner';
import type { User } from '@/types/user';
import type { CreateUserInput } from '@/lib/validators/user';

interface UserDialogProps {
  /**
   * 다이얼로그 열림 상태
   */
  open: boolean;
  /**
   * 수정할 사용자 (없으면 생성 모드)
   */
  user?: User | null;
  /**
   * 다이얼로그 닫기 콜백
   * @param shouldRefresh - 목록을 새로고침해야 하는지 여부
   */
  onClose: (shouldRefresh: boolean) => void;
}

export function UserDialog({ open, user, onClose }: UserDialogProps) {
  const isEditMode = !!user;

  const handleSuccess = async (data: CreateUserInput) => {
    try {
      if (isEditMode && user) {
        await updateUserApi(user.id, data);
        toast.success('사용자 정보가 수정되었습니다.');
      } else {
        await createUserApi(data);
        toast.success('새 사용자가 추가되었습니다.');
      }
      onClose(true);
    } catch (error) {
      toast.error('작업 중 오류가 발생했습니다.', {
        description: error instanceof Error ? error.message : '다시 시도해주세요.',
      });
    }
  };

  const handleError = (error: Error) => {
    toast.error('입력 값을 확인해주세요.', {
      description: error.message,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? '사용자 정보 수정' : '새 사용자 추가'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? '사용자의 정보를 수정합니다. 수정 후 저장 버튼을 클릭하세요.'
              : '새로운 사용자를 추가합니다. 필수 정보를 입력하세요.'}
          </DialogDescription>
        </DialogHeader>
        <UserForm
          user={user}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </DialogContent>
    </Dialog>
  );
}
