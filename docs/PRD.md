# PRD: 독서 기록 및 위시리스트

## 프로젝트 개요

### 프로젝트명
**독서 기록 및 위시리스트 (Reading Log & Wishlist)**

### 목적
Notion을 CMS(Content Management System)로 활용하여 개인의 독서 활동을 체계적으로 관리하고 공유할 수 있는 웹 애플리케이션

### CMS 선택 이유
- **Notion API 활용**: 비개발자도 Notion 인터페이스를 통해 쉽게 콘텐츠 관리 가능
- **유연한 데이터베이스**: Notion의 강력한 데이터베이스 기능으로 다양한 속성 관리
- **실시간 동기화**: Notion에서 수정한 내용이 웹사이트에 자동 반영
- **백업 및 이관 용이**: Notion 데이터는 언제든 export/import 가능

---

## 주요 기능

### 1. 독서 기록 관리
- 읽은 책의 제목, 저자, 읽은 날짜 기록
- 개인 평점(1-5점) 부여
- 짧은 서평(한줄평) 작성

### 2. 독서 상태 관리
- **읽고 싶음**: 위시리스트에 추가된 책
- **읽는 중**: 현재 읽고 있는 책
- **완독**: 읽기 완료한 책

### 3. 태그 기능
- 장르별 분류 (소설, 에세이, 자기계발, 역사, 과학 등)
- 다중 태그 지원으로 세밀한 분류 가능

---

## 기술 스택

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Components**: shadcn/ui (Radix UI 기반)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React

### CMS
- **Notion API**: @notionhq/client

### 주요 라이브러리
- **Data Fetching**: Next.js Server Components
- **Date Formatting**: date-fns
- **Validation**: Zod

---

## Notion 데이터베이스 구조

| 속성명 | 타입 | 설명 | 필수 여부 |
|--------|------|------|-----------|
| 제목 | Title | 책 이름 | ✅ 필수 |
| 저자 | Rich Text | 저자명 | ✅ 필수 |
| 독서 상태 | Select | 읽고 싶음 / 읽는 중 / 완독 | ✅ 필수 |
| 평점 | Number | 1-5점 (0.5 단위) | ⚪ 선택 |
| 읽은 날짜 | Date | 독서 완료 날짜 | ⚪ 선택 |
| 한줄평 | Rich Text | 짧은 서평 (최대 200자) | ⚪ 선택 |
| 태그 | Multi-select | 장르, 테마 분류 | ⚪ 선택 |

### Notion 데이터베이스 예시
```
데이터베이스명: 독서 기록

속성 설정:
- 제목 (Title)
- 저자 (Rich Text)
- 독서 상태 (Select)
  - 옵션: 읽고 싶음 (회색), 읽는 중 (파란색), 완독 (초록색)
- 평점 (Number)
  - 형식: 숫자
  - 범위: 0-5
- 읽은 날짜 (Date)
- 한줄평 (Rich Text)
- 태그 (Multi-select)
  - 옵션: 소설, 에세이, 자기계발, 역사, 과학, 철학, 경제경영 등
```

---

## 화면 구성

### [화면 1] 홈 페이지 (목록)
**경로**: `/`

**주요 요소**:
- 헤더
  - 사이트 제목 "나의 독서 기록"
  - 다크모드 토글
- 필터 탭
  - 전체 / 읽고 싶음 / 읽는 중 / 완독
- 도서 카드 그리드
  - 책 제목
  - 저자
  - 독서 상태 배지
  - 평점 (별 아이콘)
  - 태그
  - 읽은 날짜 (완독인 경우)
- 정렬 옵션
  - 최근 순 (기본)
  - 평점 순
  - 제목 순

**레이아웃**:
- 반응형 그리드 (모바일 1열, 태블릿 2열, 데스크톱 3열)
- 카드 형식으로 시각적 정보 제공

### [화면 2] 상세 페이지
**경로**: `/books/[id]`

**주요 요소**:
- 뒤로가기 버튼
- 도서 정보 섹션
  - 제목
  - 저자
  - 독서 상태
  - 평점 (큰 별 아이콘)
  - 읽은 날짜
  - 태그 목록
- 한줄평 섹션
  - 서평 내용 (여러 줄 지원)
- 메타 정보
  - Notion에서 생성된 날짜
  - 마지막 수정 날짜

**레이아웃**:
- 중앙 정렬된 컨텐츠 카드
- 최대 너비 800px
- 여백과 그림자로 깔끔한 UI

---

## MVP 범위

### 포함할 최소 기능
✅ **Notion API 연동**
- 환경 변수 설정
- Notion 클라이언트 초기화
- 데이터베이스 쿼리 기능

✅ **목록 페이지**
- 모든 책 조회
- 독서 상태별 필터링
- 카드 형식 레이아웃
- 반응형 그리드

✅ **상세 페이지**
- 개별 책 정보 조회
- 모든 속성 표시
- 뒤로가기 네비게이션

✅ **기본 스타일링**
- shadcn/ui 컴포넌트 활용
- 다크모드 지원
- 모바일 최적화

✅ **반응형 디자인**
- 모바일, 태블릿, 데스크톱 대응
- 터치 친화적 UI

### 제외할 기능 (향후 버전)
❌ 책 추가/수정/삭제 기능 (Notion에서만 관리)
❌ 검색 기능
❌ 댓글 기능
❌ 소셜 공유 기능
❌ 독서 통계 대시보드

---

## 구현 단계

### 1단계: 환경 설정 (15분)
- [ ] `@notionhq/client` 패키지 설치
```bash
npm install @notionhq/client
```
- [ ] `.env.local` 파일 생성 및 환경 변수 설정
```env
NOTION_API_KEY=your_secret_key
NOTION_DATABASE_ID=your_database_id
```
- [ ] Notion Integration 생성 및 데이터베이스 연결
- [ ] `src/lib/notion.ts` 클라이언트 설정 파일 생성

### 2단계: Notion 데이터베이스 생성 (10분)
- [ ] Notion에서 새 데이터베이스 생성
- [ ] 속성 7개 추가 (제목, 저자, 독서 상태, 평점, 읽은 날짜, 한줄평, 태그)
- [ ] 테스트 데이터 3-5개 입력
- [ ] Integration 연결 확인

### 3단계: 타입 정의 및 데이터 변환 (20분)
- [ ] `src/types/book.ts` 타입 정의 파일 생성
- [ ] Book 인터페이스 정의
- [ ] `src/lib/notion/transformers.ts` 변환 함수 생성
- [ ] Notion 페이지를 Book 타입으로 변환하는 헬퍼 함수

### 4단계: Repository 레이어 구현 (20분)
- [ ] `src/repositories/book.repository.ts` 생성
- [ ] 모든 책 조회 함수
- [ ] ID로 책 조회 함수
- [ ] 독서 상태별 필터링 함수
- [ ] 에러 핸들링 추가

### 5단계: 목록 페이지 구현 (30분)
- [ ] `src/app/page.tsx` 홈 페이지 생성
- [ ] Server Component로 데이터 fetch
- [ ] `src/components/books/book-card.tsx` 카드 컴포넌트 생성
- [ ] `src/components/books/book-list.tsx` 목록 컴포넌트 생성
- [ ] 필터 탭 UI 구현 (Client Component)
- [ ] 반응형 그리드 레이아웃 적용

### 6단계: 상세 페이지 구현 (20분)
- [ ] `src/app/books/[id]/page.tsx` 생성
- [ ] Dynamic Route 설정
- [ ] 책 상세 정보 컴포넌트 생성
- [ ] 평점 별 표시 컴포넌트
- [ ] 뒤로가기 버튼 추가

### 7단계: 스타일링 및 최적화 (15분)
- [ ] 다크모드 테스트
- [ ] 모바일 레이아웃 최적화
- [ ] 로딩 상태 처리 (Skeleton UI)
- [ ] 에러 바운더리 추가
- [ ] 메타 태그 및 SEO 최적화

### 8단계: 테스트 및 배포 준비 (10분)
- [ ] 로컬 환경 테스트
- [ ] 다양한 화면 크기에서 확인
- [ ] Notion 데이터 변경 후 동기화 확인
- [ ] 빌드 에러 확인
- [ ] README.md 업데이트

---

## 디렉토리 구조

```
src/
├── app/
│   ├── page.tsx                    # 홈 (목록 페이지)
│   ├── books/
│   │   └── [id]/
│   │       └── page.tsx            # 상세 페이지
│   └── layout.tsx
├── components/
│   ├── books/
│   │   ├── book-card.tsx           # 책 카드 컴포넌트
│   │   ├── book-list.tsx           # 책 목록 컴포넌트
│   │   ├── book-detail.tsx         # 책 상세 컴포넌트
│   │   ├── status-badge.tsx        # 상태 배지
│   │   └── rating-stars.tsx        # 평점 별 표시
│   └── ui/                         # shadcn/ui 컴포넌트
├── lib/
│   ├── notion.ts                   # Notion 클라이언트
│   ├── config.ts                   # 환경 설정
│   └── notion/
│       └── transformers.ts         # 데이터 변환 함수
├── repositories/
│   └── book.repository.ts          # 책 Repository
└── types/
    └── book.ts                     # 타입 정의
```

---

## 성공 지표

### 기술적 지표
- ✅ Notion API 연동 성공
- ✅ 페이지 로드 시간 < 2초
- ✅ 모바일, 태블릿, 데스크톱 모두 정상 작동
- ✅ 빌드 에러 0개
- ✅ TypeScript 타입 에러 0개

### 사용자 경험 지표
- ✅ 직관적인 UI로 3번 이내 클릭으로 원하는 정보 접근
- ✅ 반응형 디자인으로 모든 기기에서 동일한 경험 제공
- ✅ Notion에서 수정 후 새로고침 시 즉시 반영

---

## 향후 개선 계획

### Phase 2 (추가 기능)
- 검색 기능 (제목, 저자 기반)
- 태그별 필터링
- 정렬 옵션 추가 (제목순, 평점순)

### Phase 3 (고급 기능)
- 독서 통계 대시보드
  - 월별 독서량 그래프
  - 장르별 분포 차트
  - 평균 평점
- 위시리스트 우선순위 관리
- 독서 목표 설정 및 진행률 표시

### Phase 4 (소셜 기능)
- 공유 기능 (SNS 공유)
- 독서 모임 추천
- RSS 피드 제공

---

## 참고 자료

- [Notion API 공식 문서](https://developers.notion.com/)
- [Next.js 15 공식 문서](https://nextjs.org/docs)
- [shadcn/ui 컴포넌트](https://ui.shadcn.com/)
- [Tailwind CSS v4](https://tailwindcss.com/)

---

## 작성 정보

- **작성일**: 2026-01-07
- **작성자**: Claude Code
- **버전**: 1.0
- **프로젝트 코드명**: reading-log
