/**
 * 헤더 컴포넌트
 * 로고, 네비게이션, 사용자 메뉴를 포함
 */

import { Logo } from './logo';
import { NavMenu } from './nav-menu';
import { UserMenu } from './user-menu';
import { MobileMenu } from './mobile-menu';
import { Container } from '../container';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <MobileMenu />
            <Logo />
            <NavMenu />
          </div>
          <div className="flex items-center gap-4">
            <UserMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
