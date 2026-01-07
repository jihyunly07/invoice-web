# Bash 커맨드 단위 테스트

이 디렉토리는 `.claude/commands/` 아래의 Bash 커스텀 커맨드에 대한 단위 테스트를 포함합니다.

## 개요

Bats (Bash Automated Testing System)를 사용하여 다음 커맨드들을 테스트합니다:

- `create-form` - 폼 컴포넌트 + Zod 스키마 생성
- `create-api-layer` - Service + Repository + DTO + Types 생성
- `create-page` - Next.js 페이지 생성 (레이아웃별)

## 테스트 항목

### 보안 검증
- ✅ 경로 인젝션 차단 (`../malicious`, `/etc/passwd` 등)
- ✅ 유효하지 않은 문자 차단 (`test@#$`, `hello world` 등)
- ✅ 유효한 입력 허용 (`product`, `user-profile`, `api_client` 등)

### 파일 생성
- ✅ 올바른 경로에 파일 생성
- ✅ PascalCase 변환 정확성 (`product-item` → `ProductItem`)
- ✅ camelCase 변환 정확성 (`product-item` → `productItemRepository`)
- ✅ kebab-case 변환 정확성 (`ProductItem` → `product-item`)

### 옵션 처리 (create-page)
- ✅ `--layout` 옵션 (marketing, dashboard, auth)
- ✅ `--with-form` 옵션
- ✅ `--with-table` 옵션

### 생성된 코드 품질
- ✅ TypeScript 타입 안전성
- ✅ Import 경로 정확성
- ✅ 싱글톤 export 정확성 (Service, Repository)

## 설치

### Bats 설치

#### macOS (Homebrew)
```bash
brew install bats-core
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get install bats
```

#### npm (전역 설치)
```bash
npm install -g bats
```

자세한 정보: https://github.com/bats-core/bats-core

## 사용법

### 모든 테스트 실행

```bash
cd .claude/commands/__tests__
./run-tests.sh
```

### 특정 테스트만 실행

```bash
# create-form 테스트만
./run-tests.sh create-form.bats

# create-api-layer 테스트만
./run-tests.sh create-api-layer.bats

# create-page 테스트만
./run-tests.sh create-page.bats
```

### 패턴 매칭으로 실행

```bash
# create-로 시작하는 모든 테스트
./run-tests.sh create-*.bats
```

### Bats 직접 실행

```bash
# 단일 테스트 파일
bats create-form.bats

# 모든 테스트 파일
bats *.bats

# 특정 테스트만 실행 (grep 사용)
bats --filter "보안" create-form.bats
```

## 테스트 파일 구조

```
__tests__/
├── README.md                # 이 문서
├── test-helpers.bash        # 공통 헬퍼 함수
├── create-form.bats         # create-form 커맨드 테스트
├── create-api-layer.bats    # create-api-layer 커맨드 테스트
├── create-page.bats         # create-page 커맨드 테스트
└── run-tests.sh             # 테스트 실행 스크립트
```

## 테스트 헬퍼 함수

`test-helpers.bash`에서 제공하는 유용한 함수들:

### 환경 설정
- `setup_test_directory()` - 테스트용 임시 디렉토리 생성
- `cleanup_test_directory()` - 테스트 디렉토리 정리

### 검증 함수
- `assert_file_exists(file)` - 파일 존재 확인
- `assert_file_contains(file, pattern)` - 파일 내용에 패턴 포함 확인
- `assert_file_not_contains(file, pattern)` - 파일 내용에 패턴 미포함 확인
- `assert_directory_exists(dir)` - 디렉토리 존재 확인
- `assert_success()` - 커맨드 실행 성공 확인
- `assert_failure()` - 커맨드 실행 실패 확인
- `assert_output_contains(pattern)` - 출력에 패턴 포함 확인

### 변환 검증
- `assert_pascal_case(input, expected)` - PascalCase 변환 검증
- `assert_camel_case(input, expected)` - camelCase 변환 검증
- `assert_kebab_case(input, expected)` - kebab-case 변환 검증

### 코드 품질 검증
- `assert_valid_typescript(file)` - TypeScript 기본 구문 검증
- `assert_import_path(file, path)` - Import 경로 검증
- `assert_exports(file, name)` - Export 검증

## 테스트 작성 예시

```bash
@test "[보안] 경로 인젝션 시도 차단: ../" {
  run bash "$COMMAND_PATH" "../malicious"
  assert_failure
  assert_output_contains "유효하지 않은 이름"
}

@test "[파일생성] 단일 단어 이름으로 파일 생성" {
  run bash -c "yes n | bash '$COMMAND_PATH' product 2>/dev/null || true"

  assert_file_exists "src/lib/validators/product.ts"
  assert_file_exists "src/components/forms/product-form.tsx"
}

@test "[변환] product-item → ProductItem (PascalCase)" {
  assert_pascal_case "product-item" "ProductItem"
}
```

## 테스트 카테고리

각 테스트 파일은 다음과 같이 카테고리별로 구성됩니다:

### create-form.bats (60개 테스트)
1. **보안 검증 테스트** (10개)
2. **인자 검증 테스트** (2개)
3. **디렉토리 검증 테스트** (2개)
4. **파일 생성 테스트** (3개)
5. **PascalCase 변환 테스트** (4개)
6. **생성된 코드 품질 테스트** (8개)
7. **폼 필드 생성 테스트** (3개)
8. **파일 덮어쓰기 테스트** (2개)
9. **출력 메시지 테스트** (3개)
10. **통합 테스트** (2개)

### create-api-layer.bats (73개 테스트)
1. **보안 검증 테스트** (8개)
2. **인자 검증 테스트** (2개)
3. **파일 생성 테스트** (4개)
4. **PascalCase 변환 테스트** (3개)
5. **camelCase 변환 테스트** (3개)
6. **싱글톤 Export 테스트** (3개)
7. **Import 경로 테스트** (5개)
8. **Types 파일 내용 테스트** (3개)
9. **DTO 파일 내용 테스트** (5개)
10. **Repository 파일 내용 테스트** (3개)
11. **Service 파일 내용 테스트** (5개)
12. **코드 품질 테스트** (4개)
13. **파일 덮어쓰기 테스트** (2개)
14. **출력 메시지 테스트** (4개)
15. **통합 테스트** (2개)

### create-page.bats (88개 테스트)
1. **보안 검증 테스트** (9개)
2. **인자 검증 테스트** (3개)
3. **레이아웃 옵션 테스트** (6개)
4. **--with-table 옵션 테스트** (5개)
5. **--with-form 옵션 테스트** (4개)
6. **기본 페이지 생성 테스트 - marketing** (3개)
7. **기본 페이지 생성 테스트 - dashboard** (2개)
8. **기본 페이지 생성 테스트 - auth** (3개)
9. **PascalCase 변환 테스트** (3개)
10. **kebab-case 변환 테스트** (3개)
11. **디렉토리 검증 테스트** (2개)
12. **파일 덮어쓰기 테스트** (2개)
13. **코드 품질 테스트** (4개)
14. **Import 경로 테스트** (2개)
15. **출력 메시지 테스트** (6개)
16. **통합 테스트** (6개)

**총 테스트 수: 221개**

## 테스트 실행 결과 예시

```
========================================
Bats 테스트 실행
========================================

Bats 1.10.0

테스트 파일:
  • create-api-layer.bats
  • create-form.bats
  • create-page.bats

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
테스트: create-form
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

 ✓ [보안] 경로 인젝션 시도 차단: ../
 ✓ [보안] 유효한 입력 허용: 영문자만
 ✓ [파일생성] 단일 단어 이름으로 파일 생성
 ✓ [변환] product-item → ProductItem (PascalCase)
 ✓ [코드품질] TypeScript 타입 안전성 - any 타입 미사용
 ...

60 tests, 0 failures

✓ create-form 테스트 통과

========================================
테스트 결과 요약
========================================

전체 테스트 파일: 3
통과: 3
실패: 0

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ 모든 테스트가 통과했습니다!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## CI/CD 통합

### GitHub Actions 예시

```yaml
name: Test Bash Commands

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Bats
        run: |
          sudo apt-get update
          sudo apt-get install -y bats

      - name: Run tests
        run: |
          cd .claude/commands/__tests__
          ./run-tests.sh
```

## 트러블슈팅

### Bats를 찾을 수 없음
```bash
# 설치 확인
which bats

# 설치되지 않았다면
brew install bats-core  # macOS
```

### 권한 오류
```bash
# 실행 권한 부여
chmod +x run-tests.sh
chmod +x ../create-form
chmod +x ../create-api-layer
chmod +x ../create-page
```

### 테스트 실패 디버깅
```bash
# 상세 출력 모드
bats -t create-form.bats

# 특정 테스트만 실행
bats --filter "보안" create-form.bats

# 실패 시 즉시 중단
bats --no-tempdir-cleanup create-form.bats
```

## 기여 가이드

새로운 테스트를 추가할 때는:

1. 적절한 카테고리에 배치 (`[보안]`, `[파일생성]`, `[변환]` 등)
2. 명확한 테스트 설명 작성
3. `test-helpers.bash`의 헬퍼 함수 활용
4. 독립적으로 실행 가능하도록 작성 (setup/teardown 활용)

## 참고 자료

- [Bats-core GitHub](https://github.com/bats-core/bats-core)
- [Bats 튜토리얼](https://bats-core.readthedocs.io/en/stable/)
- [Bash 테스팅 가이드](https://github.com/bats-core/bats-core#writing-tests)

## 라이선스

이 테스트 코드는 프로젝트의 라이선스를 따릅니다.
