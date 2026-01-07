/**
 * 404 페이지
 * 존재하지 않는 페이지 접근 시 표시
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/lib/constants';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-6xl font-bold">404</CardTitle>
          <CardDescription className="text-lg">
            페이지를 찾을 수 없습니다
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href={ROUTES.HOME}>홈으로 돌아가기</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
