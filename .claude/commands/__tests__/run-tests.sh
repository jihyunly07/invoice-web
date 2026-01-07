#!/bin/bash

# Bats 테스트 실행 스크립트
# 사용법: ./run-tests.sh [test-file-pattern]

set -e

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Bats 설치 확인
check_bats_installation() {
  if ! command -v bats &> /dev/null; then
    echo -e "${RED}오류: Bats가 설치되어 있지 않습니다.${NC}"
    echo ""
    echo "Bats 설치 방법:"
    echo ""
    echo "macOS (Homebrew):"
    echo "  brew install bats-core"
    echo ""
    echo "Linux (Ubuntu/Debian):"
    echo "  sudo apt-get install bats"
    echo ""
    echo "npm (전역 설치):"
    echo "  npm install -g bats"
    echo ""
    echo "자세한 정보: https://github.com/bats-core/bats-core"
    exit 1
  fi
}

# 테스트 디렉토리 확인
TEST_DIR="$(cd "$(dirname "$0")" && pwd)"

# Bats 버전 출력
print_bats_version() {
  echo -e "${CYAN}========================================${NC}"
  echo -e "${CYAN}Bats 테스트 실행${NC}"
  echo -e "${CYAN}========================================${NC}"
  echo ""
  bats --version
  echo ""
}

# 테스트 파일 목록 표시
print_test_files() {
  echo -e "${BLUE}테스트 파일:${NC}"
  for file in "$TEST_DIR"/*.bats; do
    if [ -f "$file" ]; then
      echo "  • $(basename "$file")"
    fi
  done
  echo ""
}

# 단일 테스트 파일 실행
run_single_test() {
  local test_file="$1"
  local test_name=$(basename "$test_file" .bats)

  echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${YELLOW}테스트: ${test_name}${NC}"
  echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo ""

  if bats "$test_file"; then
    echo ""
    echo -e "${GREEN}✓ ${test_name} 테스트 통과${NC}"
    return 0
  else
    echo ""
    echo -e "${RED}✗ ${test_name} 테스트 실패${NC}"
    return 1
  fi
}

# 메인 실행
main() {
  # Bats 설치 확인
  check_bats_installation

  # 버전 출력
  print_bats_version

  # 테스트 패턴 (인자가 있으면 해당 패턴, 없으면 전체)
  local pattern="${1:-*.bats}"

  # 테스트 파일 찾기
  local test_files=("$TEST_DIR"/$pattern)

  # 테스트 파일이 없으면 에러
  if [ ! -f "${test_files[0]}" ]; then
    echo -e "${RED}오류: 테스트 파일을 찾을 수 없습니다: $pattern${NC}"
    echo ""
    print_test_files
    exit 1
  fi

  # 테스트 파일 목록 출력
  if [ "$pattern" = "*.bats" ]; then
    print_test_files
  fi

  # 결과 추적
  local total=0
  local passed=0
  local failed=0
  local failed_tests=()

  # 각 테스트 파일 실행
  for test_file in "${test_files[@]}"; do
    if [ -f "$test_file" ]; then
      ((total++))
      if run_single_test "$test_file"; then
        ((passed++))
      else
        ((failed++))
        failed_tests+=("$(basename "$test_file" .bats)")
      fi
      echo ""
    fi
  done

  # 최종 결과 출력
  echo ""
  echo -e "${CYAN}========================================${NC}"
  echo -e "${CYAN}테스트 결과 요약${NC}"
  echo -e "${CYAN}========================================${NC}"
  echo ""
  echo "전체 테스트 파일: $total"
  echo -e "통과: ${GREEN}$passed${NC}"
  echo -e "실패: ${RED}$failed${NC}"
  echo ""

  # 실패한 테스트 목록 출력
  if [ $failed -gt 0 ]; then
    echo -e "${RED}실패한 테스트:${NC}"
    for test in "${failed_tests[@]}"; do
      echo -e "  ${RED}✗${NC} $test"
    done
    echo ""
    exit 1
  else
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✓ 모든 테스트가 통과했습니다!${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    exit 0
  fi
}

# 도움말 출력
if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
  echo "Bats 테스트 실행 스크립트"
  echo ""
  echo "사용법: ./run-tests.sh [test-file-pattern]"
  echo ""
  echo "예시:"
  echo "  ./run-tests.sh                    # 모든 테스트 실행"
  echo "  ./run-tests.sh create-form.bats   # 특정 테스트만 실행"
  echo "  ./run-tests.sh create-*.bats      # 패턴 매칭"
  echo ""
  echo "옵션:"
  echo "  -h, --help    이 도움말 표시"
  echo ""
  exit 0
fi

# 스크립트 실행
main "$@"
