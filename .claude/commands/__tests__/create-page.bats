#!/usr/bin/env bats

# create-page 커맨드 테스트
# 사용법: bats create-page.bats

load test-helpers

# 테스트 전역 변수
COMMAND_PATH=""

# 각 테스트 전 실행
setup() {
  # 테스트 디렉토리 설정
  setup_test_directory

  # 커맨드 경로 설정 (절대 경로)
  COMMAND_PATH="$(cd "$(dirname "$BATS_TEST_DIRNAME")/.." && pwd)/create-page"

  # 커맨드 실행 권한 확인
  if [ ! -x "$COMMAND_PATH" ]; then
    chmod +x "$COMMAND_PATH"
  fi
}

# 각 테스트 후 실행
teardown() {
  cleanup_test_directory
}

# ============================================================
# 보안 검증 테스트
# ============================================================

@test "[보안] 경로 인젝션 시도 차단: ../" {
  run bash "$COMMAND_PATH" "../malicious"
  assert_failure
  assert_output_contains "유효하지 않은 이름"
}

@test "[보안] 경로 인젝션 시도 차단: ../../etc/passwd" {
  run bash "$COMMAND_PATH" "../../etc/passwd"
  assert_failure
  assert_output_contains "유효하지 않은 이름"
}

@test "[보안] 절대 경로 차단: /etc/passwd" {
  run bash "$COMMAND_PATH" "/etc/passwd"
  assert_failure
  assert_output_contains "유효하지 않은 이름"
}

@test "[보안] 유효하지 않은 문자 차단: 특수문자(@)" {
  run bash "$COMMAND_PATH" "test@name"
  assert_failure
  assert_output_contains "영문자, 숫자, 하이픈, 언더스코어만 사용 가능"
}

@test "[보안] 유효하지 않은 문자 차단: 특수문자(!#$)" {
  run bash "$COMMAND_PATH" "test!#\$"
  assert_failure
  assert_output_contains "영문자, 숫자, 하이픈, 언더스코어만 사용 가능"
}

@test "[보안] 유효하지 않은 문자 차단: 공백" {
  run bash "$COMMAND_PATH" "hello world"
  assert_failure
  assert_output_contains "영문자, 숫자, 하이픈, 언더스코어만 사용 가능"
}

@test "[보안] 유효한 입력 허용: 영문자만" {
  run bash -c "yes n | bash '$COMMAND_PATH' about 2>/dev/null || true"
  [ -d "src/app/(marketing)/about" ]
}

@test "[보안] 유효한 입력 허용: 하이픈 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user-settings 2>/dev/null || true"
  [ -d "src/app/(marketing)/user-settings" ]
}

@test "[보안] 유효한 입력 허용: 언더스코어 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' api_docs 2>/dev/null || true"
  [ -d "src/app/(marketing)/api_docs" ]
}

# ============================================================
# 인자 검증 테스트
# ============================================================

@test "[인자] 인자 없이 실행 시 에러 메시지 출력" {
  run bash "$COMMAND_PATH"
  assert_failure
  assert_output_contains "페이지 이름을 입력해주세요"
  assert_output_contains "사용법: create-page <name>"
}

@test "[인자] 도움말 메시지에 옵션 설명 포함" {
  run bash "$COMMAND_PATH"
  assert_failure
  assert_output_contains "--layout"
  assert_output_contains "--with-form"
  assert_output_contains "--with-table"
}

@test "[인자] 도움말 메시지에 예시 포함" {
  run bash "$COMMAND_PATH"
  assert_failure
  assert_output_contains "예시:"
  assert_output_contains "create-page products --layout dashboard --with-table"
}

# ============================================================
# 레이아웃 옵션 테스트
# ============================================================

@test "[레이아웃] 기본 레이아웃은 marketing" {
  run bash -c "yes n | bash '$COMMAND_PATH' about 2>/dev/null || true"

  assert_file_exists "src/app/(marketing)/about/page.tsx"
}

@test "[레이아웃] --layout marketing 옵션" {
  run bash -c "yes n | bash '$COMMAND_PATH' pricing --layout marketing 2>/dev/null || true"

  assert_file_exists "src/app/(marketing)/pricing/page.tsx"
}

@test "[레이아웃] --layout dashboard 옵션" {
  run bash -c "yes n | bash '$COMMAND_PATH' users --layout dashboard 2>/dev/null || true"

  assert_file_exists "src/app/(dashboard)/users/page.tsx"
}

@test "[레이아웃] --layout auth 옵션" {
  run bash -c "yes n | bash '$COMMAND_PATH' login --layout auth 2>/dev/null || true"

  assert_file_exists "src/app/(auth)/login/page.tsx"
}

@test "[레이아웃] 유효하지 않은 레이아웃 거부" {
  run bash "$COMMAND_PATH" about --layout invalid
  assert_failure
  assert_output_contains "marketing, dashboard, auth 중 하나여야 합니다"
}

@test "[레이아웃] 알 수 없는 옵션 거부" {
  run bash "$COMMAND_PATH" about --unknown-option
  assert_failure
  assert_output_contains "알 수 없는 옵션"
}

# ============================================================
# --with-table 옵션 테스트
# ============================================================

@test "[테이블] --with-table 옵션으로 테이블 페이지 생성" {
  run bash -c "yes n | bash '$COMMAND_PATH' products --layout dashboard --with-table 2>/dev/null || true"

  local page_file="src/app/(dashboard)/products/page.tsx"
  assert_file_exists "$page_file"
  assert_file_contains "$page_file" "'use client'"
  assert_file_contains "$page_file" "import { DataTable }"
}

@test "[테이블] 데이터 상태 관리 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' products --layout dashboard --with-table 2>/dev/null || true"

  local page_file="src/app/(dashboard)/products/page.tsx"
  assert_file_contains "$page_file" "useState"
  assert_file_contains "$page_file" "useEffect"
}

@test "[테이블] 추가 버튼 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' products --layout dashboard --with-table 2>/dev/null || true"

  local page_file="src/app/(dashboard)/products/page.tsx"
  assert_file_contains "$page_file" "<Plus"
  assert_file_contains "$page_file" "추가하기"
}

@test "[테이블] 로딩 스피너 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' products --layout dashboard --with-table 2>/dev/null || true"

  local page_file="src/app/(dashboard)/products/page.tsx"
  assert_file_contains "$page_file" "LoadingSpinner"
  assert_file_contains "$page_file" "loading"
}

@test "[테이블] 토스트 알림 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' products --layout dashboard --with-table 2>/dev/null || true"

  local page_file="src/app/(dashboard)/products/page.tsx"
  assert_file_contains "$page_file" "import { toast }"
  assert_file_contains "$page_file" "toast.error"
  assert_file_contains "$page_file" "toast.success"
}

# ============================================================
# --with-form 옵션 테스트
# ============================================================

@test "[폼] --with-form 옵션으로 폼 페이지 생성" {
  run bash -c "yes n | bash '$COMMAND_PATH' contact --layout marketing --with-form 2>/dev/null || true"

  local page_file="src/app/(marketing)/contact/page.tsx"
  assert_file_exists "$page_file"
  assert_file_contains "$page_file" "'use client'"
}

@test "[폼] Card 컴포넌트 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' contact --layout marketing --with-form 2>/dev/null || true"

  local page_file="src/app/(marketing)/contact/page.tsx"
  assert_file_contains "$page_file" "import { Card"
  assert_file_contains "$page_file" "<Card>"
  assert_file_contains "$page_file" "<CardHeader>"
  assert_file_contains "$page_file" "<CardContent>"
}

@test "[폼] 성공/에러 핸들러 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' contact --layout marketing --with-form 2>/dev/null || true"

  local page_file="src/app/(marketing)/contact/page.tsx"
  assert_file_contains "$page_file" "handleSuccess"
  assert_file_contains "$page_file" "handleError"
}

@test "[폼] TODO 주석으로 폼 컴포넌트 import 안내" {
  run bash -c "yes n | bash '$COMMAND_PATH' contact --layout marketing --with-form 2>/dev/null || true"

  local page_file="src/app/(marketing)/contact/page.tsx"
  assert_file_contains "$page_file" "TODO: 실제 폼 컴포넌트 import"
}

# ============================================================
# 기본 페이지 생성 테스트 (marketing)
# ============================================================

@test "[기본/Marketing] 마케팅 레이아웃 페이지 생성" {
  run bash -c "yes n | bash '$COMMAND_PATH' about --layout marketing 2>/dev/null || true"

  local page_file="src/app/(marketing)/about/page.tsx"
  assert_file_exists "$page_file"
  assert_file_contains "$page_file" "import { Container }"
  assert_file_contains "$page_file" "export default function AboutPage()"
}

@test "[기본/Marketing] 페이지 헤더 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' about --layout marketing 2>/dev/null || true"

  local page_file="src/app/(marketing)/about/page.tsx"
  assert_file_contains "$page_file" "<h1"
  assert_file_contains "$page_file" "About"
}

@test "[기본/Marketing] prose 스타일 적용" {
  run bash -c "yes n | bash '$COMMAND_PATH' about --layout marketing 2>/dev/null || true"

  local page_file="src/app/(marketing)/about/page.tsx"
  assert_file_contains "$page_file" "prose"
}

# ============================================================
# 기본 페이지 생성 테스트 (dashboard)
# ============================================================

@test "[기본/Dashboard] 대시보드 레이아웃 페이지 생성" {
  run bash -c "yes n | bash '$COMMAND_PATH' settings --layout dashboard 2>/dev/null || true"

  local page_file="src/app/(dashboard)/settings/page.tsx"
  assert_file_exists "$page_file"
  assert_file_contains "$page_file" "import { Container }"
  assert_file_contains "$page_file" "export default function SettingsPage()"
}

@test "[기본/Dashboard] Card 컴포넌트 사용" {
  run bash -c "yes n | bash '$COMMAND_PATH' settings --layout dashboard 2>/dev/null || true"

  local page_file="src/app/(dashboard)/settings/page.tsx"
  assert_file_contains "$page_file" "import { Card"
  assert_file_contains "$page_file" "<Card>"
}

# ============================================================
# 기본 페이지 생성 테스트 (auth)
# ============================================================

@test "[기본/Auth] 인증 레이아웃 페이지 생성" {
  run bash -c "yes n | bash '$COMMAND_PATH' login --layout auth 2>/dev/null || true"

  local page_file="src/app/(auth)/login/page.tsx"
  assert_file_exists "$page_file"
  assert_file_contains "$page_file" "export default function LoginPage()"
}

@test "[기본/Auth] 중앙 정렬 레이아웃" {
  run bash -c "yes n | bash '$COMMAND_PATH' login --layout auth 2>/dev/null || true"

  local page_file="src/app/(auth)/login/page.tsx"
  assert_file_contains "$page_file" "flex"
  assert_file_contains "$page_file" "items-center"
  assert_file_contains "$page_file" "justify-center"
}

@test "[기본/Auth] 최대 너비 제한" {
  run bash -c "yes n | bash '$COMMAND_PATH' login --layout auth 2>/dev/null || true"

  local page_file="src/app/(auth)/login/page.tsx"
  assert_file_contains "$page_file" "max-w-md"
}

# ============================================================
# PascalCase 변환 테스트
# ============================================================

@test "[변환] about → About (PascalCase)" {
  assert_pascal_case "about" "About"
}

@test "[변환] user-settings → UserSettings (PascalCase)" {
  assert_pascal_case "user-settings" "UserSettings"
}

@test "[변환] product-item-detail → ProductItemDetail (PascalCase)" {
  assert_pascal_case "product-item-detail" "ProductItemDetail"
}

# ============================================================
# kebab-case 변환 테스트
# ============================================================

@test "[변환] About → about (kebab-case)" {
  assert_kebab_case "About" "about"
}

@test "[변환] UserSettings → user-settings (kebab-case)" {
  assert_kebab_case "UserSettings" "user-settings"
}

@test "[변환] ProductItemDetail → product-item-detail (kebab-case)" {
  assert_kebab_case "ProductItemDetail" "product-item-detail"
}

# ============================================================
# 디렉토리 검증 테스트
# ============================================================

@test "[디렉토리] 레이아웃 폴더 없으면 에러" {
  rm -rf "src/app/(marketing)"

  run bash "$COMMAND_PATH" about --layout marketing
  assert_failure
  assert_output_contains "src/app/(marketing) 폴더를 찾을 수 없습니다"
}

@test "[디렉토리] 페이지 디렉토리 자동 생성" {
  run bash -c "yes n | bash '$COMMAND_PATH' about 2>/dev/null || true"

  assert_directory_exists "src/app/(marketing)/about"
}

# ============================================================
# 파일 덮어쓰기 테스트
# ============================================================

@test "[덮어쓰기] 기존 디렉토리 존재 시 경고 메시지" {
  # 먼저 페이지 생성
  run bash -c "yes n | bash '$COMMAND_PATH' about 2>/dev/null || true"

  # 다시 같은 이름으로 실행
  run bash -c "echo n | bash '$COMMAND_PATH' about 2>&1"

  # 경고 메시지 확인
  assert_output_contains "이미 존재합니다"
}

@test "[덮어쓰기] 취소 시 기존 파일 유지" {
  # 먼저 페이지 생성
  run bash -c "yes n | bash '$COMMAND_PATH' about 2>/dev/null || true"

  # 원본 파일 내용 저장
  local original_content=$(cat "src/app/(marketing)/about/page.tsx")

  # n 입력으로 취소
  run bash -c "echo n | bash '$COMMAND_PATH' about 2>&1"

  # 파일 내용 변경되지 않았는지 확인
  local current_content=$(cat "src/app/(marketing)/about/page.tsx")
  [ "$original_content" = "$current_content" ]
}

# ============================================================
# 코드 품질 테스트
# ============================================================

@test "[코드품질] TypeScript 타입 안전성 - any 타입 미사용" {
  run bash -c "yes n | bash '$COMMAND_PATH' about --layout marketing 2>/dev/null || true"

  local page_file="src/app/(marketing)/about/page.tsx"
  assert_file_not_contains "$page_file" ": any"
}

@test "[코드품질] export default function 사용" {
  run bash -c "yes n | bash '$COMMAND_PATH' about 2>/dev/null || true"

  local page_file="src/app/(marketing)/about/page.tsx"
  assert_file_contains "$page_file" "export default function"
}

@test "[코드품질] PascalCase 함수명" {
  run bash -c "yes n | bash '$COMMAND_PATH' user-settings 2>/dev/null || true"

  local page_file="src/app/(marketing)/user-settings/page.tsx"
  assert_file_contains "$page_file" "function UserSettingsPage()"
}

@test "[코드품질] 한국어 주석 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' about 2>/dev/null || true"

  local page_file="src/app/(marketing)/about/page.tsx"
  assert_file_contains "$page_file" "페이지"
}

# ============================================================
# Import 경로 테스트
# ============================================================

@test "[Import] Container import 경로 (@/ 별칭)" {
  run bash -c "yes n | bash '$COMMAND_PATH' about 2>/dev/null || true"

  local page_file="src/app/(marketing)/about/page.tsx"
  assert_file_contains "$page_file" "from '@/components/layout/container'"
}

@test "[Import] UI 컴포넌트 import 경로 (@/ 별칭)" {
  run bash -c "yes n | bash '$COMMAND_PATH' settings --layout dashboard 2>/dev/null || true"

  local page_file="src/app/(dashboard)/settings/page.tsx"
  assert_file_contains "$page_file" "from '@/components/ui/card'"
}

# ============================================================
# 출력 메시지 테스트
# ============================================================

@test "[출력] 성공 메시지 출력" {
  run bash -c "yes n | bash '$COMMAND_PATH' about 2>&1"

  assert_output_contains "페이지 생성이 완료되었습니다"
}

@test "[출력] 생성된 파일 경로 출력" {
  run bash -c "yes n | bash '$COMMAND_PATH' about 2>&1"

  assert_output_contains "src/app/(marketing)/about/page.tsx"
}

@test "[출력] 레이아웃 정보 출력" {
  run bash -c "yes n | bash '$COMMAND_PATH' about 2>&1"

  assert_output_contains "레이아웃: (marketing)"
}

@test "[출력] 접근 경로 출력" {
  run bash -c "yes n | bash '$COMMAND_PATH' about 2>&1"

  assert_output_contains "경로: /about"
}

@test "[출력] 다음 단계 안내 (테이블)" {
  run bash -c "yes n | bash '$COMMAND_PATH' products --with-table 2>&1"

  assert_output_contains "다음 단계"
  assert_output_contains "타입 정의 추가"
  assert_output_contains "컬럼 정의 추가"
}

@test "[출력] 다음 단계 안내 (폼)" {
  run bash -c "yes n | bash '$COMMAND_PATH' contact --with-form 2>&1"

  assert_output_contains "다음 단계"
  assert_output_contains "create-form 명령어로 폼 생성"
}

# ============================================================
# 통합 테스트
# ============================================================

@test "[통합] 전체 워크플로우 - 마케팅 페이지 생성" {
  run bash -c "yes n | bash '$COMMAND_PATH' about --layout marketing 2>/dev/null || true"

  # 디렉토리 생성 확인
  assert_directory_exists "src/app/(marketing)/about"

  # 파일 생성 확인
  assert_file_exists "src/app/(marketing)/about/page.tsx"

  # 내용 검증
  local page_file="src/app/(marketing)/about/page.tsx"
  assert_file_contains "$page_file" "export default function AboutPage()"
  assert_file_contains "$page_file" "import { Container }"
  assert_file_contains "$page_file" "<h1"

  # TypeScript 구문 검증
  assert_valid_typescript "$page_file"
}

@test "[통합] 전체 워크플로우 - 대시보드 테이블 페이지" {
  run bash -c "yes n | bash '$COMMAND_PATH' products --layout dashboard --with-table 2>/dev/null || true"

  # 파일 생성 확인
  local page_file="src/app/(dashboard)/products/page.tsx"
  assert_file_exists "$page_file"

  # 클라이언트 컴포넌트 확인
  assert_file_contains "$page_file" "'use client'"

  # 필수 import 확인
  assert_file_contains "$page_file" "import { DataTable }"
  assert_file_contains "$page_file" "import { LoadingSpinner }"
  assert_file_contains "$page_file" "import { toast }"

  # 상태 관리 확인
  assert_file_contains "$page_file" "useState"
  assert_file_contains "$page_file" "useEffect"

  # UI 요소 확인
  assert_file_contains "$page_file" "<Plus"
  assert_file_contains "$page_file" "추가하기"

  # TypeScript 구문 검증
  assert_valid_typescript "$page_file"
}

@test "[통합] 전체 워크플로우 - 폼 페이지 (user-profile)" {
  run bash -c "yes n | bash '$COMMAND_PATH' user-profile --layout marketing --with-form 2>/dev/null || true"

  # 파일 생성 확인
  local page_file="src/app/(marketing)/user-profile/page.tsx"
  assert_file_exists "$page_file"

  # PascalCase 변환 확인
  assert_file_contains "$page_file" "export default function UserProfilePage()"

  # Card 컴포넌트 확인
  assert_file_contains "$page_file" "<Card>"
  assert_file_contains "$page_file" "<CardHeader>"
  assert_file_contains "$page_file" "<CardContent>"

  # 핸들러 확인
  assert_file_contains "$page_file" "handleSuccess"
  assert_file_contains "$page_file" "handleError"

  # TypeScript 구문 검증
  assert_valid_typescript "$page_file"
}

@test "[통합] 전체 워크플로우 - 인증 페이지" {
  run bash -c "yes n | bash '$COMMAND_PATH' login --layout auth 2>/dev/null || true"

  # 파일 생성 확인
  local page_file="src/app/(auth)/login/page.tsx"
  assert_file_exists "$page_file"

  # 레이아웃 확인
  assert_file_contains "$page_file" "flex"
  assert_file_contains "$page_file" "min-h-"
  assert_file_contains "$page_file" "items-center"
  assert_file_contains "$page_file" "justify-center"

  # 최대 너비 확인
  assert_file_contains "$page_file" "max-w-md"

  # TypeScript 구문 검증
  assert_valid_typescript "$page_file"
}

@test "[통합] 옵션 조합 - dashboard + table" {
  run bash -c "yes n | bash '$COMMAND_PATH' products --layout dashboard --with-table 2>/dev/null || true"

  local page_file="src/app/(dashboard)/products/page.tsx"
  assert_file_exists "$page_file"
  assert_file_contains "$page_file" "DataTable"
}

@test "[통합] 옵션 조합 - marketing + form" {
  run bash -c "yes n | bash '$COMMAND_PATH' contact --layout marketing --with-form 2>/dev/null || true"

  local page_file="src/app/(marketing)/contact/page.tsx"
  assert_file_exists "$page_file"
  assert_file_contains "$page_file" "handleSuccess"
}
