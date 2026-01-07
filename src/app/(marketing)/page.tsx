/**
 * 랜딩 페이지
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { ROUTES } from '@/lib/constants';

export default function Home() {
  return (
    <>
      {/* 히어로 섹션 */}
      <Section className="pt-20 pb-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              모던 웹 개발을 위한
              <br />
              <span className="text-primary">스타터킷</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Next.js 15, React 19, TypeScript, Tailwind CSS v4로 구축된
              프로덕션 레디 스타터킷입니다.
              검증된 라이브러리와 모범 사례를 따릅니다.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href={ROUTES.REGISTER}>시작하기</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={ROUTES.ABOUT}>자세히 보기</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* 기능 섹션 */}
      <Section className="bg-muted/50">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              주요 기능
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              빠른 개발을 위한 모든 것이 준비되어 있습니다
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                    {feature.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA 섹션 */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              지금 바로 시작하세요
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              모던 웹 개발의 모범 사례를 따르는 스타터킷으로
              프로젝트를 빠르게 시작하세요.
            </p>
            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href={ROUTES.REGISTER}>무료로 시작하기</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

const features = [
  {
    title: '최신 기술 스택',
    description: '검증된 최신 기술로 구축',
    items: [
      'Next.js 15 App Router',
      'React 19',
      'TypeScript 5',
      'Tailwind CSS v4',
    ],
  },
  {
    title: 'UI 컴포넌트',
    description: '아름다운 디자인 시스템',
    items: [
      'Shadcn UI',
      '다크모드 지원',
      '반응형 디자인',
      'Atomic Design',
    ],
  },
  {
    title: '검증된 라이브러리',
    description: '프로덕션 레디',
    items: [
      'React Hook Form + Zod',
      'Zustand',
      'TanStack Table',
      'date-fns',
    ],
  },
  {
    title: '개발자 경험',
    description: '생산성 극대화',
    items: [
      'TypeScript 타입 안전성',
      'ESLint 설정',
      '명확한 폴더 구조',
      '한국어 주석',
    ],
  },
  {
    title: '아키텍처',
    description: '확장 가능한 구조',
    items: [
      '레이어드 아키텍처',
      'Service/Repository 패턴',
      'DTO 패턴',
      '의존성 주입',
    ],
  },
  {
    title: '즉시 사용 가능',
    description: '바로 시작하세요',
    items: [
      '인증 준비 완료',
      'API 구조 제공',
      '에러 핸들링',
      '로딩 상태 관리',
    ],
  },
];
