'use client';

/**
 * 뒤로가기 버튼 컴포넌트
 * 브라우저 히스토리 기반으로 이전 페이지로 이동
 */

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  label?: string;
}

export function BackButton({ label = '뒤로가기' }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
      className="gap-2 pl-0 hover:bg-transparent"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  );
}
