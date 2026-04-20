/**
 * 푸터 컴포넌트
 */

import { Container } from '../container';
import { config } from '@/lib/config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="py-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <span className="text-xl font-bold">📚</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {config.app.description}
            </p>
            <p className="text-xs text-muted-foreground">
              © {currentYear} {config.app.name}. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
