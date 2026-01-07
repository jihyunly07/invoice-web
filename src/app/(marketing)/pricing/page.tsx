/**
 * 가격 페이지
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { PricingCard } from '@/components/cards/pricing-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';
import { toast } from 'sonner';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleSelectPlan = (planName: string) => {
    toast.success('플랜 선택', {
      description: `${planName} 플랜이 선택되었습니다.`,
    });
  };

  return (
    <>
      {/* 히어로 섹션 */}
      <Section className="pt-20 pb-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4">Pricing</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              합리적인 가격으로
              <br />
              <span className="text-primary">모든 기능을 이용하세요</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              프로젝트 규모에 맞는 플랜을 선택하세요. 언제든지 변경 가능합니다.
            </p>
          </div>

          {/* 빌링 사이클 토글 */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-lg border p-1">
              <Button
                variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setBillingCycle('monthly')}
              >
                월간 결제
              </Button>
              <Button
                variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setBillingCycle('yearly')}
              >
                연간 결제
                <Badge className="ml-2" variant="secondary">
                  20% 할인
                </Badge>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* 가격 카드 섹션 */}
      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan) => {
              const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
              const period = billingCycle === 'monthly' ? '월' : '년';

              return (
                <PricingCard
                  key={plan.name}
                  name={plan.name}
                  description={plan.description}
                  price={price}
                  period={period}
                  features={plan.features}
                  featured={plan.featured}
                  ctaText={plan.ctaText}
                  onCtaClick={() => handleSelectPlan(plan.name)}
                />
              );
            })}
          </div>
        </Container>
      </Section>

      {/* FAQ 섹션 */}
      <Section className="bg-muted/50">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
              자주 묻는 질문
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-lg border bg-card p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA 섹션 */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              아직 결정하지 못하셨나요?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              무료 체험으로 먼저 경험해보세요. 신용카드 등록 없이 바로 시작할 수 있습니다.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href={ROUTES.REGISTER}>무료로 시작하기</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#">데모 보기</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

const pricingPlans = [
  {
    name: 'Starter',
    description: '개인 프로젝트와 소규모 팀에 적합',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      '최대 3개 프로젝트',
      '기본 컴포넌트 라이브러리',
      '커뮤니티 지원',
      '월 10GB 스토리지',
      '기본 분석 기능',
    ],
    ctaText: '무료로 시작하기',
    featured: false,
  },
  {
    name: 'Pro',
    description: '성장하는 비즈니스를 위한 최적의 선택',
    monthlyPrice: 29000,
    yearlyPrice: 278400, // 20% 할인
    features: [
      '무제한 프로젝트',
      '프리미엄 컴포넌트',
      '우선 지원',
      '월 100GB 스토리지',
      '고급 분석 및 리포트',
      '팀 협업 기능',
      '커스텀 도메인',
    ],
    ctaText: 'Pro 시작하기',
    featured: true,
  },
  {
    name: 'Enterprise',
    description: '대규모 조직을 위한 맞춤형 솔루션',
    monthlyPrice: '문의',
    yearlyPrice: '문의',
    features: [
      '모든 Pro 기능 포함',
      '무제한 스토리지',
      '전담 계정 매니저',
      'SLA 보장',
      '온프레미스 옵션',
      '맞춤형 개발 지원',
      '보안 감사',
      '교육 및 트레이닝',
    ],
    ctaText: '문의하기',
    featured: false,
  },
];

const faqs = [
  {
    question: '플랜을 변경할 수 있나요?',
    answer: '네, 언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 변경 사항은 다음 결제 주기부터 적용됩니다.',
  },
  {
    question: '환불 정책은 어떻게 되나요?',
    answer: '결제 후 7일 이내에는 100% 환불이 가능합니다. 단, 서비스를 사용하지 않은 경우에 한합니다.',
  },
  {
    question: '무료 체험 기간이 있나요?',
    answer: 'Starter 플랜은 영구 무료이며, Pro 플랜은 14일 무료 체험이 제공됩니다.',
  },
  {
    question: '팀원을 추가할 수 있나요?',
    answer: 'Pro 플랜 이상부터 팀원 추가가 가능합니다. 추가 팀원당 월 9,000원이 부과됩니다.',
  },
  {
    question: '기술 지원은 어떻게 받나요?',
    answer: 'Starter는 커뮤니티 지원, Pro는 이메일 지원 (24시간 응답), Enterprise는 전담 매니저가 배정됩니다.',
  },
];
