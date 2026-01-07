/**
 * 푸터 컴포넌트
 */

import Link from 'next/link';
import { Container } from '../container';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/lib/constants';
import { config } from '@/lib/config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* 브랜드 */}
            <div className="space-y-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <span className="text-lg font-bold">C</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {config.app.description}
              </p>
            </div>

            {/* 제품 */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">제품</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    기능
                  </Link>
                </li>
                <li>
                  <Link href={ROUTES.PRICING} className="text-muted-foreground hover:text-foreground">
                    가격
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    문서
                  </Link>
                </li>
              </ul>
            </div>

            {/* 회사 */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">회사</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={ROUTES.ABOUT} className="text-muted-foreground hover:text-foreground">
                    소개
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    블로그
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    채용
                  </Link>
                </li>
              </ul>
            </div>

            {/* 지원 */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">지원</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    고객 지원
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    개인정보 처리방침
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    이용약관
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col items-center justify-between space-y-4 text-sm text-muted-foreground md:flex-row md:space-y-0">
            <p>© {currentYear} {config.app.name}. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-foreground">
                GitHub
              </Link>
              <Link href="#" className="hover:text-foreground">
                Twitter
              </Link>
              <Link href="#" className="hover:text-foreground">
                Discord
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
