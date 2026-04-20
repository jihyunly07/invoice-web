# 개발 가이드라인

## 프로젝트 개요

- **목적**: Notion API를 활용한 독서 기록 및 위시리스트 관리 웹 앱
- **스택**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui
- **외부 연동**: Notion API (`NOTION_TOKEN`, `NOTION_DATABASE_ID` 환경변수 필요)
- **앱 이름/설명**: `src/lib/config.ts`의 `config.app` 객체에서 중앙 관리

---

## 프로젝트 구조

```
src/
├── app/                        # Next.js App Router 페이지
│   ├── layout.tsx              # 루트 레이아웃 (Header, Footer, ThemeProvider, Toaster 포함)
│   ├── page.tsx                # 홈 페이지 (독서 목록)
│   ├── globals.css             # Tailwind CSS 글로벌 스타일
│   ├── error.tsx               # 에러 페이지
│   ├── loading.tsx             # 로딩 페이지
│   └── not-found.tsx           # 404 페이지
├── components/
│   ├── ui/                     # shadcn/ui 컴포넌트 (직접 편집 금지)
│   ├── layout/
│   │   ├── container.tsx       # 최대 너비 컨테이너 (max-w-7xl, 반응형 padding)
│   │   ├── page-header.tsx     # 페이지 제목/설명 헤더
│   │   ├── section.tsx         # 섹션 컴포넌트
│   │   ├── header/
│   │   │   ├── header.tsx      # 메인 헤더 (스티키, 다크모드 토글)
│   │   │   └── logo.tsx        # 로고 컴포넌트
│   │   └── footer/
│   │       └── footer.tsx      # 푸터 (config.app 데이터 사용)
│   ├── common/
│   │   ├── empty-state.tsx     # 빈 상태 표시
│   │   └── loading-spinner.tsx # 로딩 스피너
│   └── providers/
│       └── theme-provider.tsx  # next-themes ThemeProvider
├── lib/
│   ├── utils.ts                # cn() 유틸리티
│   ├── config.ts               # 앱/Notion 설정 (환경변수 중앙 관리)
│   ├── constants.ts            # 상수 (ROUTES, BREAKPOINTS, READING_STATUS 등)
│   ├── validators/             # Zod 스키마 정의
│   ├── formatters/
│   │   ├── date.ts             # 날짜 포맷터
│   │   └── number.ts           # 숫자 포맷터
│   └── data/                   # Mock 데이터 (개발용)
├── hooks/                      # 커스텀 훅
├── types/
│   ├── index.ts                # 타입 재export
│   ├── common.ts               # 공통 타입 (Status, PaginationMeta 등)
│   └── api.ts                  # API 응답 타입
├── store/                      # Zustand 상태 관리
├── services/                   # API 서비스 레이어 (Notion API 통신)
├── repositories/               # 데이터 접근 레이어
└── dto/                        # Data Transfer Objects
```

---

## 코드 규칙

### TypeScript

- `any` 타입 **절대 사용 금지** → `unknown` 또는 구체적 타입 사용
- TypeScript strict 모드 활성화 상태 유지
- 새 타입은 반드시 `src/types/` 디렉토리에 정의
- Zod 스키마는 `src/lib/validators/`에 정의하고 `z.infer<typeof schema>`로 타입 추출
- 경로 별칭 `@/*` 사용 (`src/*` 매핑) → 상대경로 사용 금지

### 네이밍

- 변수/함수: `camelCase`
- 컴포넌트/타입/인터페이스: `PascalCase`
- 상수: `UPPER_SNAKE_CASE`
- 파일명: `kebab-case` (컴포넌트 포함)

### 주석

- 한국어로 작성 (필수)
- JSDoc 스타일 사용 (`/** */`)
- 파일 상단에 파일 목적 주석 작성

---

## 컴포넌트 규칙

### RSC vs 클라이언트 컴포넌트

- 기본값: RSC (React Server Components) — `'use client'` 없으면 서버 컴포넌트
- `useState`, `useEffect`, `useTheme`, 이벤트 핸들러 사용 시 반드시 `'use client'` 선언
- `'use client'`는 파일 최상단 첫 번째 줄에 작성

### 컴포넌트 작성

- 모든 페이지 콘텐츠는 `<Container>` 로 감싸기
- 페이지 컴포넌트는 `src/app/` 하위에, 재사용 컴포넌트는 `src/components/` 하위에 배치
- `src/components/ui/` 파일은 직접 편집 금지 → shadcn/ui CLI로 추가/관리
- 새 shadcn 컴포넌트 추가: `npx shadcn@latest add [component-name]`

---

## 스타일링 규칙

- 클래스 조합 시 반드시 `cn()` 함수 사용 (`@/lib/utils` import)
- Tailwind CSS v4 사용 — CSS 변수 기반 테마 시스템
- 다크모드: `dark:` 접두사로 처리, `next-themes` ThemeProvider 활용
- 반응형 필수: 모바일 우선 (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)
- 브레이크포인트 값은 `BREAKPOINTS` 상수 참조 (`src/lib/constants.ts`)
- 인라인 스타일(`style={{}}`) 사용 금지 → Tailwind 클래스 사용

---

## Notion API 통합 규칙

- Notion 설정은 `src/lib/config.ts`의 `config.notion` 객체에서 접근
  ```ts
  config.notion.token       // NOTION_TOKEN 환경변수
  config.notion.databaseId  // NOTION_DATABASE_ID 환경변수
  ```
- Notion API 호출은 반드시 서버 사이드(Server Component 또는 Route Handler)에서만 실행
- 클라이언트 컴포넌트에서 Notion 토큰 직접 접근 금지 (`NOTION_TOKEN`은 `NEXT_PUBLIC_` 접두사 없음)
- Notion 데이터 접근 로직은 `src/repositories/` 레이어에 구현
- 비즈니스 로직은 `src/services/` 레이어에 구현

---

## API 응답 형식

모든 API 응답은 `src/types/api.ts`의 타입을 따름:

- 성공 응답: `ApiSuccessResponse<T>` → `{ success: true, data: T, message?: string }`
- 에러 응답: `ApiErrorResponse` → `{ success: false, error: ApiError }`
- 페이지네이션 응답: `PaginatedApiResponse<T>` → `{ success: true, data: T[], pagination: PaginationMeta }`

---

## 상태 관리 규칙

- 전역 상태: Zustand (`src/store/`) 사용
- 폼 상태: React Hook Form + Zod 사용
- 서버 상태: Next.js Server Components의 직접 fetch 또는 별도 캐싱 전략
- `useState`는 로컬 UI 상태에만 사용

---

## 핵심 파일 상호작용 규칙

| 수정 파일 | 함께 확인/수정할 파일 |
|-----------|----------------------|
| `src/lib/constants.ts` (ROUTES 추가) | `src/lib/config.ts`, 관련 페이지 파일 |
| `src/types/common.ts` | `src/types/index.ts` (재export 확인) |
| `src/lib/config.ts` | `.env` 환경변수 키 일치 여부 확인 |
| 새 Notion 데이터 필드 추가 | `src/types/`, `src/lib/validators/`, `src/repositories/` 동시 업데이트 |
| `src/components/layout/header/header.tsx` | `src/app/layout.tsx` 레이아웃 구조 확인 |

---

## 독서 기록 도메인 규칙

- 독서 상태는 반드시 `READING_STATUS` 상수 사용 (`src/lib/constants.ts`)
  - `'all'` | `'wishlist'` | `'reading'` | `'completed'`
- 독서 상태 라벨은 `READING_STATUS_LABEL` 사용
- 도서 라우트는 `ROUTES.BOOKS = '/books'` 사용
- 새 독서 상태 추가 시 `READING_STATUS`, `READING_STATUS_LABEL` 동시 업데이트

---

## 에러 핸들링 규칙

- 모든 비동기 작업에 에러 핸들링 필수
- Next.js `error.tsx` 파일로 페이지 레벨 에러 처리
- 사용자 알림은 sonner `toast` 사용 (`@/components/ui/sonner`)
- API 에러는 `ApiErrorResponse` 형식으로 통일

---

## 금지 사항

- `any` 타입 사용 금지
- `src/components/ui/` 파일 직접 편집 금지 (shadcn/ui 관리 영역)
- 클라이언트 컴포넌트에서 `NOTION_TOKEN` 등 서버 전용 환경변수 접근 금지
- `NEXT_PUBLIC_` 없는 환경변수를 클라이언트 번들에 포함 금지
- 인라인 스타일(`style={{}}`) 사용 금지
- 상대경로 import 사용 금지 (`../` 대신 `@/` 사용)
- `src/lib/config.ts` 외부에서 환경변수(`process.env`) 직접 접근 금지
- Notion API 호출을 클라이언트 컴포넌트에서 직접 실행 금지
- 한국어 주석 없이 코드 작성 금지 (복잡한 로직에는 반드시 주석 필요)
