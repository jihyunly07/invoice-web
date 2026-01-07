/**
 * 소개 페이지
 */

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Zap, Shield, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      {/* 히어로 섹션 */}
      <Section className="pt-20 pb-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4">About Us</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              모던 웹 개발을 위한
              <br />
              <span className="text-primary">최고의 스타터킷</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              검증된 기술 스택과 모범 사례를 기반으로 한 프로덕션 레디 스타터킷입니다.
              빠르고 효율적인 웹 개발을 시작하세요.
            </p>
          </div>
        </Container>
      </Section>

      {/* 특징 섹션 */}
      <Section className="bg-muted/50">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              왜 이 스타터킷인가요?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              개발자 경험과 생산성을 극대화하는 기능들
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="mb-4 inline-flex">
                    <div className="rounded-lg bg-primary/10 p-3 text-primary">
                      <feature.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 기술 스택 섹션 */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              기술 스택
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              최신 기술과 검증된 라이브러리로 구성
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {techStack.map((tech) => (
              <Card key={tech.category}>
                <CardHeader>
                  <CardTitle className="text-lg">{tech.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tech.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 팀 섹션 */}
      <Section className="bg-muted/50">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              커뮤니티와 함께
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              오픈소스 정신으로 함께 만들어가는 프로젝트입니다.
              여러분의 기여를 환영합니다!
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Badge variant="outline" className="px-4 py-2">
                GitHub Stars: 1.2K+
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                Contributors: 50+
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                Downloads: 10K+
              </Badge>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

const features = [
  {
    icon: Code,
    title: '타입 안전성',
    description: 'TypeScript로 작성된 완전한 타입 안전 코드베이스',
  },
  {
    icon: Zap,
    title: '빠른 개발',
    description: '재사용 가능한 컴포넌트로 개발 속도 향상',
  },
  {
    icon: Shield,
    title: '프로덕션 레디',
    description: '검증된 아키텍처와 모범 사례 적용',
  },
  {
    icon: Users,
    title: '커뮤니티',
    description: '활발한 커뮤니티와 지속적인 업데이트',
  },
];

const techStack = [
  {
    category: '코어 프레임워크',
    items: ['Next.js 15', 'React 19', 'TypeScript 5', 'Tailwind CSS v4'],
  },
  {
    category: 'UI 라이브러리',
    items: ['Shadcn UI', 'Lucide Icons', 'next-themes', 'Radix UI'],
  },
  {
    category: '상태 관리',
    items: ['Zustand', 'React Hook Form', 'Zod', 'TanStack Table'],
  },
  {
    category: '유틸리티',
    items: ['date-fns', 'axios', 'usehooks-ts', 'class-variance-authority'],
  },
  {
    category: '개발 도구',
    items: ['ESLint', 'Prettier', 'TypeScript', 'Git Hooks'],
  },
  {
    category: '아키텍처',
    items: ['Atomic Design', 'Layered Architecture', 'Service Pattern', 'DTO Pattern'],
  },
];
