# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Next.js 15, React 19, TypeScript 기반의 모던 웹 스타터킷입니다. shadcn/ui, Tailwind CSS v4, Zustand를 사용하여 구축되었습니다.

## 개발 명령어

### 기본 명령어
- `npm run dev` - 개발 서버 실행 (http://localhost:3000)
- `npm run build` - 프로덕션 빌드
- `npm start` - 프로덕션 서버 실행
- `npm run lint` - ESLint 실행

### shadcn/ui 컴포넌트 추가
```bash
npx shadcn@latest add [component-name]
```
- 설정 파일: `components.json` (new-york 스타일, RSC 활성화)
- 컴포넌트는 `src/components/ui/`에 설치됨

## 아키텍처

### 프로젝트 구조 (src 기반)

```
src/
├── app/                    # Next.js App Router
│   ├── (marketing)/        # 마케팅 페이지 (Header + Footer)
│   ├── (dashboard)/        # 대시보드 (Sidebar + Main)
│   ├── (auth)/            # 인증 페이지 (최소 레이아웃)
│   ├── layout.tsx         # 루트 레이아웃 (ThemeProvider, Toaster)
│   └── globals.css        # Tailwind CSS 글로벌 스타일
├── components/
│   ├── ui/                # shadcn/ui 컴포넌트
│   ├── layout/            # 레이아웃 컴포넌트 (Header, Footer, Sidebar)
│   ├── forms/             # 폼 컴포넌트 (React Hook Form + Zod)
│   ├── tables/            # 데이터 테이블 (TanStack Table)
│   ├── cards/             # 카드 컴포넌트
│   ├── common/            # 공통 컴포넌트
│   └── providers/         # 프로바이더 (ThemeProvider)
├── lib/
│   ├── utils.ts           # cn() 유틸리티 (clsx + tailwind-merge)
│   ├── config.ts          # 앱 설정 (환경변수)
│   ├── constants.ts       # 상수 정의
│   ├── validators/        # Zod 스키마 (auth, user, settings)
│   ├── formatters/        # 포맷터 (date, number)
│   └── data/              # Mock 데이터
├── hooks/                 # 커스텀 훅
├── types/                 # TypeScript 타입 정의
├── store/                 # Zustand 상태 관리
├── services/              # API 서비스 레이어 (예정)
├── repositories/          # 데이터 접근 레이어 (예정)
└── dto/                   # Data Transfer Objects (예정)
```

### 레이아웃 시스템

프로젝트는 3가지 레이아웃 그룹을 사용합니다:

1. **Marketing Layout** `(marketing)`: Header + Footer
   - 홈, About, Pricing 페이지

2. **Dashboard Layout** `(dashboard)`: Sidebar + Main
   - 대시보드, 사용자 관리, 설정 페이지

3. **Auth Layout** `(auth)`: 최소 레이아웃
   - 로그인, 회원가입 페이지

### 경로 별칭 (Path Aliases)

TypeScript 경로는 `@/*`로 `src/*`에 매핑되어 있습니다:
```typescript
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
```

### 폼 검증 패턴

폼은 React Hook Form + Zod를 사용합니다:

1. `src/lib/validators/`에서 Zod 스키마 정의
2. `z.infer`로 타입 추출
3. `@hookform/resolvers`로 React Hook Form 통합
4. 예시: `src/lib/validators/auth.ts`의 `loginSchema`, `registerSchema`

### 스타일링

- **CSS 프레임워크**: Tailwind CSS v4
- **컴포넌트 라이브러리**: shadcn/ui (Radix UI 기반)
- **테마**: next-themes를 통한 다크모드 지원
- **유틸리티**: `cn()` 함수 (clsx + tailwind-merge)

### 주요 기술 스택

- **상태 관리**: Zustand (`src/store/`)
- **데이터 테이블**: TanStack Table (`src/components/tables/`)
- **날짜**: date-fns, react-day-picker
- **HTTP**: axios (설정: `src/lib/config.ts`)
- **아이콘**: lucide-react
- **알림**: sonner (Toaster)
- **커스텀 훅**: usehooks-ts, use-debounce, use-local-storage-state

## 코딩 규칙

### TypeScript
- Strict 모드 활성화
- `any` 타입 사용 금지
- 타입은 `src/types/`에 정의
- Zod 스키마에서 타입 추출 (`z.infer`)

### 컴포넌트
- RSC (React Server Components) 우선 사용
- 클라이언트 컴포넌트는 `'use client'` 명시
- 컴포넌트 분리 및 재사용 중심
- 네이밍: PascalCase

### 네이밍
- 변수/함수: camelCase
- 컴포넌트: PascalCase
- 상수: UPPER_SNAKE_CASE (선택)

### 주석
- 한국어로 작성
- JSDoc 스타일 권장

### 레이어드 아키텍처 (진행 중)

향후 Controller → Service → Repository 패턴 적용 예정:
- `src/services/`: 비즈니스 로직
- `src/repositories/`: 데이터 접근
- `src/dto/`: 데이터 전송 객체

### 환경 변수

`src/lib/config.ts`에서 중앙 관리:
```typescript
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_API_URL
```

### API 응답

일관된 응답 형식 사용 (`src/types/api.ts` 참조)
