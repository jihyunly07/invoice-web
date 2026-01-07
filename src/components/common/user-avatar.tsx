/**
 * 사용자 아바타 컴포넌트
 * Avatar + Badge 조합
 */

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  /**
   * 사용자 이름
   */
  name: string;
  /**
   * 아바타 이미지 URL
   */
  src?: string;
  /**
   * 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * 온라인 상태 표시 여부
   */
  showStatus?: boolean;
  /**
   * 온라인 여부
   */
  isOnline?: boolean;
  /**
   * 추가 클래스명
   */
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

const badgeSizeClasses = {
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  xl: 'h-4 w-4',
};

/**
 * 이름에서 이니셜 추출
 */
function getInitials(name: string): string {
  const words = name.trim().split(' ');
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export function UserAvatar({
  name,
  src,
  size = 'md',
  showStatus = false,
  isOnline = false,
  className,
}: UserAvatarProps) {
  return (
    <div className={cn('relative inline-block', className)}>
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={src} alt={name} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      {showStatus && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-background',
            badgeSizeClasses[size],
            isOnline ? 'bg-green-500' : 'bg-gray-400'
          )}
          aria-label={isOnline ? '온라인' : '오프라인'}
        />
      )}
    </div>
  );
}
