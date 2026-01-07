#!/bin/bash

# Bats 테스트 헬퍼 함수
# 테스트 환경 설정 및 공통 함수 제공

# 색상 정의 (테스트 출력용)
export TEST_RED='\033[0;31m'
export TEST_GREEN='\033[0;32m'
export TEST_YELLOW='\033[1;33m'
export TEST_BLUE='\033[0;34m'
export TEST_NC='\033[0m'

# 테스트용 임시 디렉토리 생성
setup_test_directory() {
  export TEST_DIR="${BATS_TEST_TMPDIR}/test-project"
  mkdir -p "$TEST_DIR"
  cd "$TEST_DIR"

  # Next.js 프로젝트 구조 생성
  mkdir -p src/lib/validators
  mkdir -p src/components/forms
  mkdir -p src/services
  mkdir -p src/repositories
  mkdir -p src/dto
  mkdir -p src/types
  mkdir -p "src/app/(marketing)"
  mkdir -p "src/app/(dashboard)"
  mkdir -p "src/app/(auth)"
}

# 테스트 디렉토리 정리
cleanup_test_directory() {
  if [ -d "$TEST_DIR" ]; then
    rm -rf "$TEST_DIR"
  fi
}

# 파일 존재 여부 확인
assert_file_exists() {
  local file="$1"
  [ -f "$file" ] || {
    echo "파일이 존재하지 않습니다: $file"
    return 1
  }
}

# 파일 내용에 특정 문자열 포함 확인
assert_file_contains() {
  local file="$1"
  local pattern="$2"
  grep -q "$pattern" "$file" || {
    echo "파일에 패턴이 없습니다: $pattern"
    echo "파일 경로: $file"
    return 1
  }
}

# 파일 내용에 특정 문자열 미포함 확인
assert_file_not_contains() {
  local file="$1"
  local pattern="$2"
  ! grep -q "$pattern" "$file" || {
    echo "파일에 패턴이 존재합니다 (예상: 없음): $pattern"
    echo "파일 경로: $file"
    return 1
  }
}

# 디렉토리 존재 여부 확인
assert_directory_exists() {
  local dir="$1"
  [ -d "$dir" ] || {
    echo "디렉토리가 존재하지 않습니다: $dir"
    return 1
  }
}

# 커맨드 실행 성공 확인
assert_success() {
  [ "$status" -eq 0 ] || {
    echo "커맨드가 실패했습니다 (종료 코드: $status)"
    echo "출력: $output"
    return 1
  }
}

# 커맨드 실행 실패 확인
assert_failure() {
  [ "$status" -ne 0 ] || {
    echo "커맨드가 성공했습니다 (예상: 실패)"
    echo "출력: $output"
    return 1
  }
}

# 출력에 특정 문자열 포함 확인
assert_output_contains() {
  local pattern="$1"
  echo "$output" | grep -q "$pattern" || {
    echo "출력에 패턴이 없습니다: $pattern"
    echo "실제 출력: $output"
    return 1
  }
}

# TypeScript 구문 검증 (간단한 체크)
assert_valid_typescript() {
  local file="$1"

  # 기본 구문 검증
  assert_file_contains "$file" "import"
  assert_file_contains "$file" "export"

  # 잘못된 패턴 확인
  assert_file_not_contains "$file" "undefined-undefined"
  assert_file_not_contains "$file" "null-null"
}

# PascalCase 변환 검증
assert_pascal_case() {
  local input="$1"
  local expected="$2"
  local actual

  # PascalCase 변환 로직 (커맨드와 동일)
  local kebab=$(echo "$input" | sed 's/\([A-Z]\)/-\1/g' | sed 's/^-//' | tr '[:upper:]' '[:lower:]')
  actual=$(echo "$kebab" | perl -pe 's/(^|-)(.)/\U$2/g')

  [ "$actual" = "$expected" ] || {
    echo "PascalCase 변환 실패"
    echo "입력: $input"
    echo "예상: $expected"
    echo "실제: $actual"
    return 1
  }
}

# camelCase 변환 검증
assert_camel_case() {
  local input="$1"
  local expected="$2"
  local actual

  # camelCase 변환 로직 (커맨드와 동일)
  local kebab=$(echo "$input" | sed 's/\([A-Z]\)/-\1/g' | sed 's/^-//' | tr '[:upper:]' '[:lower:]')
  actual=$(echo "$kebab" | perl -pe 's/-(.)/\U$1/g')

  [ "$actual" = "$expected" ] || {
    echo "camelCase 변환 실패"
    echo "입력: $input"
    echo "예상: $expected"
    echo "실제: $actual"
    return 1
  }
}

# kebab-case 변환 검증
assert_kebab_case() {
  local input="$1"
  local expected="$2"
  local actual

  # kebab-case 변환 로직 (커맨드와 동일)
  actual=$(echo "$input" | sed 's/\([A-Z]\)/-\1/g' | sed 's/^-//' | tr '[:upper:]' '[:lower:]')

  [ "$actual" = "$expected" ] || {
    echo "kebab-case 변환 실패"
    echo "입력: $input"
    echo "예상: $expected"
    echo "실제: $actual"
    return 1
  }
}

# Import 경로 검증
assert_import_path() {
  local file="$1"
  local import_path="$2"

  assert_file_contains "$file" "from '$import_path'"
}

# Export 검증
assert_exports() {
  local file="$1"
  local export_name="$2"

  assert_file_contains "$file" "export.*$export_name"
}
