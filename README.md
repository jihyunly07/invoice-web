# 독서 기록 및 위시리스트 📚

Notion을 CMS로 활용한 개인 독서 관리 웹 애플리케이션

## 프로젝트 소개

Notion API를 활용하여 독서 활동을 체계적으로 관리하고 공유할 수 있는 웹 애플리케이션입니다.
Notion 데이터베이스에서 책 정보를 조회하여 읽은 책, 읽고 있는 책, 읽고 싶은 책을 관리할 수 있습니다.

## 주요 기능

- 📖 독서 기록 관리 (제목, 저자, 읽은 날짜, 평점)
- 📝 짧은 서평 작성
- 🏷️ 독서 상태 관리 (읽고 싶음 / 읽는 중 / 완독)
- 🔖 태그 기능 (장르별 분류)
- 📱 반응형 디자인 (모바일, 태블릿, 데스크톱)

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **CMS**: Notion API (@notionhq/client)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## 시작하기

### 1. 환경 변수 설정

`.env.local` 파일을 생성하고 Notion API 키를 설정합니다:

```bash
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_database_id
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. 패키지 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인합니다.

## Notion 데이터베이스 구조

Notion에서 다음 속성을 가진 데이터베이스를 생성해야 합니다:

| 속성명 | 타입 | 설명 |
|--------|------|------|
| 제목 | Title | 책 이름 (필수) |
| 저자 | Rich Text | 저자명 (필수) |
| 독서 상태 | Select | 읽고 싶음 / 읽는 중 / 완독 (필수) |
| 평점 | Number | 1-5점 |
| 읽은 날짜 | Date | 독서 완료 날짜 |
| 한줄평 | Rich Text | 짧은 서평 |
| 태그 | Multi-select | 장르 분류 (소설, 에세이, 자기계발 등) |

## 프로젝트 구조

```
src/
├── app/                  # Next.js App Router
│   ├── page.tsx         # 홈 (목록 페이지)
│   └── books/[id]/      # 상세 페이지
├── components/
│   ├── books/           # 책 관련 컴포넌트
│   └── ui/              # shadcn/ui 컴포넌트
├── lib/
│   ├── notion.ts        # Notion 클라이언트
│   └── notion/          # Notion 유틸리티
├── repositories/        # 데이터 접근 계층
└── types/               # TypeScript 타입
```

## 주요 스크립트

- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm start` - 프로덕션 서버 실행
- `npm run lint` - ESLint 실행

## 문서

- [PRD (Product Requirements Document)](./docs/PRD.md) - 프로젝트 상세 기획서

## 라이선스

MIT
