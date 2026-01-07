/**
 * 가격 카드 컴포넌트
 * 가격 플랜을 표시
 */

import { Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  /**
   * 플랜 이름
   */
  name: string;
  /**
   * 플랜 설명
   */
  description: string;
  /**
   * 가격
   */
  price: string | number;
  /**
   * 가격 단위 (예: '월', '년')
   */
  period?: string;
  /**
   * 포함된 기능 목록
   */
  features: string[];
  /**
   * 추천 플랜 여부
   */
  featured?: boolean;
  /**
   * CTA 버튼 텍스트
   */
  ctaText?: string;
  /**
   * CTA 버튼 클릭 핸들러
   */
  onCtaClick?: () => void;
  /**
   * 추가 클래스명
   */
  className?: string;
}

export function PricingCard({
  name,
  description,
  price,
  period = '월',
  features,
  featured = false,
  ctaText = '시작하기',
  onCtaClick,
  className,
}: PricingCardProps) {
  return (
    <Card className={cn(
      'relative flex flex-col',
      featured && 'border-primary shadow-lg',
      className
    )}>
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary">추천</Badge>
        </div>
      )}

      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="mb-6 text-center">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold">{price}</span>
            {typeof price === 'number' && (
              <span className="text-xl text-muted-foreground">원</span>
            )}
          </div>
          {period && (
            <p className="text-sm text-muted-foreground">/ {period}</p>
          )}
        </div>

        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          variant={featured ? 'default' : 'outline'}
          className="w-full"
          onClick={onCtaClick}
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
}
