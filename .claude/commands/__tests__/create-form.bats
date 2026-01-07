#!/usr/bin/env bats

# create-form 커맨드 테스트
# 사용법: bats create-form.bats

load test-helpers

# 테스트 전역 변수
COMMAND_PATH=""

# 각 테스트 전 실행
setup() {
  # 테스트 디렉토리 설정
  setup_test_directory

  # 커맨드 경로 설정 (절대 경로)
  COMMAND_PATH="$(cd "$(dirname "$BATS_TEST_DIRNAME")/.." && pwd)/create-form"

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

@test "[보안] 유효하지 않은 문자 차단: 특수문자(#$%)" {
  run bash "$COMMAND_PATH" "test#\$%"
  assert_failure
  assert_output_contains "영문자, 숫자, 하이픈, 언더스코어만 사용 가능"
}

@test "[보안] 유효하지 않은 문자 차단: 공백" {
  run bash "$COMMAND_PATH" "hello world"
  assert_failure
  assert_output_contains "영문자, 숫자, 하이픈, 언더스코어만 사용 가능"
}

@test "[보안] 유효한 입력 허용: 영문자만" {
  run bash -c "yes n | bash '$COMMAND_PATH' product 2>/dev/null || true"
  [ -f "src/lib/validators/product.ts" ]
}

@test "[보안] 유효한 입력 허용: 하이픈 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user-profile 2>/dev/null || true"
  [ -f "src/lib/validators/user-profile.ts" ]
}

@test "[보안] 유효한 입력 허용: 언더스코어 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' api_client 2>/dev/null || true"
  [ -f "src/lib/validators/api_client.ts" ]
}

@test "[보안] 유효한 입력 허용: 숫자 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' product123 2>/dev/null || true"
  [ -f "src/lib/validators/product123.ts" ]
}

# ============================================================
# 인자 검증 테스트
# ============================================================

@test "[인자] 인자 없이 실행 시 에러 메시지 출력" {
  run bash "$COMMAND_PATH"
  assert_failure
  assert_output_contains "폼 이름을 입력해주세요"
  assert_output_contains "사용법: create-form <name>"
}

@test "[인자] 도움말 메시지에 예시 포함" {
  run bash "$COMMAND_PATH"
  assert_failure
  assert_output_contains "예: create-form product"
}

# ============================================================
# 디렉토리 검증 테스트
# ============================================================

@test "[디렉토리] validators 폴더 없으면 에러" {
  rm -rf src/lib/validators
  run bash "$COMMAND_PATH" product
  assert_failure
  assert_output_contains "src/lib/validators 폴더를 찾을 수 없습니다"
}

@test "[디렉토리] forms 폴더 없으면 에러" {
  rm -rf src/components/forms
  run bash "$COMMAND_PATH" product
  assert_failure
  assert_output_contains "src/components/forms 폴더를 찾을 수 없습니다"
}

# ============================================================
# 파일 생성 테스트
# ============================================================

@test "[파일생성] 단일 단어 이름으로 파일 생성" {
  run bash -c "yes n | bash '$COMMAND_PATH' product 2>/dev/null || true"

  assert_file_exists "src/lib/validators/product.ts"
  assert_file_exists "src/components/forms/product-form.tsx"
}

@test "[파일생성] 하이픈 포함 이름으로 파일 생성" {
  run bash -c "yes n | bash '$COMMAND_PATH' product-item 2>/dev/null || true"

  assert_file_exists "src/lib/validators/product-item.ts"
  assert_file_exists "src/components/forms/product-item-form.tsx"
}

@test "[파일생성] PascalCase 입력을 kebab-case로 변환" {
  run bash -c "yes n | bash '$COMMAND_PATH' ProductItem 2>/dev/null || true"

  assert_file_exists "src/lib/validators/product-item.ts"
  assert_file_exists "src/components/forms/product-item-form.tsx"
}

# ============================================================
# PascalCase 변환 테스트
# ============================================================

@test "[변환] product → Product (PascalCase)" {
  assert_pascal_case "product" "Product"
}

@test "[변환] product-item → ProductItem (PascalCase)" {
  assert_pascal_case "product-item" "ProductItem"
}

@test "[변환] user-profile-settings → UserProfileSettings (PascalCase)" {
  assert_pascal_case "user-profile-settings" "UserProfileSettings"
}

@test "[변환] api_client → ApiClient (PascalCase)" {
  # 언더스코어를 하이픈으로 먼저 변환
  local kebab=$(echo "api_client" | tr '_' '-')
  assert_pascal_case "$kebab" "ApiClient"
}

# ============================================================
# 생성된 코드 품질 테스트
# ============================================================

@test "[코드품질] Zod 스키마 파일에 필수 import 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' product 2>/dev/null || true"

  local validator_file="src/lib/validators/product.ts"
  assert_file_contains "$validator_file" "import { z } from 'zod'"
  assert_file_contains "$validator_file" "export const productSchema"
  assert_file_contains "$validator_file" "export type ProductInput"
}

@test "[코드품질] 폼 파일에 필수 import 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' product 2>/dev/null || true"

  local form_file="src/components/forms/product-form.tsx"
  assert_file_contains "$form_file" "'use client'"
  assert_file_contains "$form_file" "import { useState } from 'react'"
  assert_file_contains "$form_file" "import { useForm } from 'react-hook-form'"
  assert_file_contains "$form_file" "import { zodResolver } from '@hookform/resolvers/zod'"
}

@test "[코드품질] 폼 파일에 올바른 validator import 경로" {
  run bash -c "yes n | bash '$COMMAND_PATH' product-item 2>/dev/null || true"

  local form_file="src/components/forms/product-item-form.tsx"
  assert_file_contains "$form_file" "@/lib/validators/product-item"
}

@test "[코드품질] Zod 스키마에 타입 추론 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' product 2>/dev/null || true"

  local validator_file="src/lib/validators/product.ts"
  assert_file_contains "$validator_file" "z.infer<typeof productSchema>"
}

@test "[코드품질] 폼 컴포넌트가 PascalCase로 export" {
  run bash -c "yes n | bash '$COMMAND_PATH' product-item 2>/dev/null || true"

  local form_file="src/components/forms/product-item-form.tsx"
  assert_file_contains "$form_file" "export function ProductItemForm"
}

@test "[코드품질] TypeScript 타입 안전성 - any 타입 미사용" {
  run bash -c "yes n | bash '$COMMAND_PATH' product 2>/dev/null || true"

  local form_file="src/components/forms/product-form.tsx"
  local validator_file="src/lib/validators/product.ts"

  assert_file_not_contains "$form_file" ": any"
  assert_file_not_contains "$validator_file" ": any"
}

@test "[코드품질] 한국어 주석 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' product 2>/dev/null || true"

  local validator_file="src/lib/validators/product.ts"
  assert_file_contains "$validator_file" "유효성 검증"
}

# ============================================================
# 폼 필드 생성 테스트
# ============================================================

@test "[폼필드] name 필드 생성" {
  run bash -c "yes n | bash '$COMMAND_PATH' product 2>/dev/null || true"

  local form_file="src/components/forms/product-form.tsx"
  assert_file_contains "$form_file" 'name="name"'
}

@test "[폼필드] description 필드 생성 (선택사항)" {
  run bash -c "yes n | bash '$COMMAND_PATH' product 2>/dev/null || true"

  local form_file="src/components/forms/product-form.tsx"
  assert_file_contains "$form_file" 'name="description"'
}

@test "[폼필드] 제출 버튼 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' product 2>/dev/null || true"

  local form_file="src/components/forms/product-form.tsx"
  assert_file_contains "$form_file" 'type="submit"'
}

# ============================================================
# 파일 덮어쓰기 테스트
# ============================================================

@test "[덮어쓰기] 기존 파일 존재 시 경고 메시지 (validator)" {
  # 먼저 파일 생성
  run bash -c "yes n | bash '$COMMAND_PATH' product 2>/dev/null || true"

  # 다시 같은 이름으로 실행
  run bash -c "echo n | bash '$COMMAND_PATH' product 2>&1"

  # 경고 메시지 확인
  assert_output_contains "이미 존재합니다"
}

@test "[덮어쓰기] 기존 파일 존재 시 취소 가능" {
  # 먼저 파일 생성
  run bash -c "yes n | bash '$COMMAND_PATH' product 2>/dev/null || true"

  # 원본 파일 내용 저장
  local original_content=$(cat "src/lib/validators/product.ts")

  # n 입력으로 취소
  run bash -c "echo n | bash '$COMMAND_PATH' product 2>&1"

  # 파일 내용 변경되지 않았는지 확인
  local current_content=$(cat "src/lib/validators/product.ts")
  [ "$original_content" = "$current_content" ]
}

# ============================================================
# 출력 메시지 테스트
# ============================================================

@test "[출력] 성공 메시지 출력" {
  run bash -c "yes n | bash '$COMMAND_PATH' product 2>&1"

  assert_output_contains "폼 생성이 완료되었습니다"
}

@test "[출력] 생성된 파일 목록 출력" {
  run bash -c "yes n | bash '$COMMAND_PATH' product 2>&1"

  assert_output_contains "src/lib/validators/product.ts"
  assert_output_contains "src/components/forms/product-form.tsx"
}

@test "[출력] 다음 단계 안내" {
  run bash -c "yes n | bash '$COMMAND_PATH' product 2>&1"

  assert_output_contains "다음 단계"
}

# ============================================================
# 통합 테스트
# ============================================================

@test "[통합] 전체 워크플로우 - product 폼 생성" {
  run bash -c "yes n | bash '$COMMAND_PATH' product 2>/dev/null || true"

  # 파일 존재 확인
  assert_file_exists "src/lib/validators/product.ts"
  assert_file_exists "src/components/forms/product-form.tsx"

  # 스키마 검증
  local validator_file="src/lib/validators/product.ts"
  assert_file_contains "$validator_file" "export const productSchema"
  assert_file_contains "$validator_file" "export type ProductInput"

  # 폼 검증
  local form_file="src/components/forms/product-form.tsx"
  assert_file_contains "$form_file" "export function ProductForm"
  assert_file_contains "$form_file" "@/lib/validators/product"

  # TypeScript 구문 검증
  assert_valid_typescript "$validator_file"
  assert_valid_typescript "$form_file"
}

@test "[통합] 전체 워크플로우 - user-profile 폼 생성 (하이픈 포함)" {
  run bash -c "yes n | bash '$COMMAND_PATH' user-profile 2>/dev/null || true"

  # 파일 존재 확인
  assert_file_exists "src/lib/validators/user-profile.ts"
  assert_file_exists "src/components/forms/user-profile-form.tsx"

  # PascalCase 변환 확인
  local form_file="src/components/forms/user-profile-form.tsx"
  assert_file_contains "$form_file" "export function UserProfileForm"
  assert_file_contains "$form_file" "UserProfileInput"

  # Import 경로 확인
  assert_file_contains "$form_file" "@/lib/validators/user-profile"
}
