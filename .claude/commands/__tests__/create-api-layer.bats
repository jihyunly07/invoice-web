#!/usr/bin/env bats

# create-api-layer 커맨드 테스트
# 사용법: bats create-api-layer.bats

load test-helpers

# 테스트 전역 변수
COMMAND_PATH=""

# 각 테스트 전 실행
setup() {
  # 테스트 디렉토리 설정
  setup_test_directory

  # 커맨드 경로 설정 (절대 경로)
  COMMAND_PATH="$(cd "$(dirname "$BATS_TEST_DIRNAME")/.." && pwd)/create-api-layer"

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

@test "[보안] 유효하지 않은 문자 차단: 특수문자(!@#)" {
  run bash "$COMMAND_PATH" "test!@#"
  assert_failure
  assert_output_contains "영문자, 숫자, 하이픈, 언더스코어만 사용 가능"
}

@test "[보안] 유효하지 않은 문자 차단: 공백" {
  run bash "$COMMAND_PATH" "hello world"
  assert_failure
  assert_output_contains "영문자, 숫자, 하이픈, 언더스코어만 사용 가능"
}

@test "[보안] 유효한 입력 허용: 영문자만" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"
  [ -f "src/services/user.service.ts" ]
}

@test "[보안] 유효한 입력 허용: 하이픈 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user-profile 2>/dev/null || true"
  [ -f "src/services/user-profile.service.ts" ]
}

@test "[보안] 유효한 입력 허용: 언더스코어 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' api_client 2>/dev/null || true"
  [ -f "src/services/api_client.service.ts" ]
}

# ============================================================
# 인자 검증 테스트
# ============================================================

@test "[인자] 인자 없이 실행 시 에러 메시지 출력" {
  run bash "$COMMAND_PATH"
  assert_failure
  assert_output_contains "API 이름을 입력해주세요"
  assert_output_contains "사용법: create-api-layer <name>"
}

@test "[인자] 도움말 메시지에 예시 포함" {
  run bash "$COMMAND_PATH"
  assert_failure
  assert_output_contains "예: create-api-layer user"
}

# ============================================================
# 파일 생성 테스트
# ============================================================

@test "[파일생성] 4개 파일 모두 생성 (Service, Repository, DTO, Types)" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  assert_file_exists "src/services/user.service.ts"
  assert_file_exists "src/repositories/user.repository.ts"
  assert_file_exists "src/dto/user.dto.ts"
  assert_file_exists "src/types/user.ts"
}

@test "[파일생성] 하이픈 포함 이름으로 파일 생성" {
  run bash -c "yes n | bash '$COMMAND_PATH' user-profile 2>/dev/null || true"

  assert_file_exists "src/services/user-profile.service.ts"
  assert_file_exists "src/repositories/user-profile.repository.ts"
  assert_file_exists "src/dto/user-profile.dto.ts"
  assert_file_exists "src/types/user-profile.ts"
}

@test "[파일생성] PascalCase 입력을 kebab-case로 변환" {
  run bash -c "yes n | bash '$COMMAND_PATH' UserProfile 2>/dev/null || true"

  assert_file_exists "src/services/user-profile.service.ts"
  assert_file_exists "src/repositories/user-profile.repository.ts"
  assert_file_exists "src/dto/user-profile.dto.ts"
  assert_file_exists "src/types/user-profile.ts"
}

@test "[파일생성] 필요한 디렉토리 자동 생성" {
  # 디렉토리 삭제
  rm -rf src/services src/repositories src/dto

  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  # 디렉토리 생성 확인
  assert_directory_exists "src/services"
  assert_directory_exists "src/repositories"
  assert_directory_exists "src/dto"
}

# ============================================================
# PascalCase 변환 테스트
# ============================================================

@test "[변환] user → User (PascalCase)" {
  assert_pascal_case "user" "User"
}

@test "[변환] user-profile → UserProfile (PascalCase)" {
  assert_pascal_case "user-profile" "UserProfile"
}

@test "[변환] product-category-item → ProductCategoryItem (PascalCase)" {
  assert_pascal_case "product-category-item" "ProductCategoryItem"
}

# ============================================================
# camelCase 변환 테스트
# ============================================================

@test "[변환] user → user (camelCase)" {
  assert_camel_case "user" "user"
}

@test "[변환] user-profile → userProfile (camelCase)" {
  assert_camel_case "user-profile" "userProfile"
}

@test "[변환] product-item-detail → productItemDetail (camelCase)" {
  assert_camel_case "product-item-detail" "productItemDetail"
}

# ============================================================
# 싱글톤 Export 테스트
# ============================================================

@test "[싱글톤] Service 싱글톤 export (camelCase)" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local service_file="src/services/user.service.ts"
  assert_file_contains "$service_file" "export const userService = new UserService()"
}

@test "[싱글톤] Repository 싱글톤 export (camelCase)" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local repo_file="src/repositories/user.repository.ts"
  assert_file_contains "$repo_file" "export const userRepository = new UserRepository()"
}

@test "[싱글톤] 하이픈 포함 이름의 싱글톤 export (camelCase)" {
  run bash -c "yes n | bash '$COMMAND_PATH' user-profile 2>/dev/null || true"

  local service_file="src/services/user-profile.service.ts"
  assert_file_contains "$service_file" "export const userProfileService = new UserProfileService()"
}

# ============================================================
# Import 경로 테스트
# ============================================================

@test "[Import] Service가 Repository import" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local service_file="src/services/user.service.ts"
  assert_file_contains "$service_file" "import { userRepository } from '@/repositories/user.repository'"
}

@test "[Import] Service가 DTO import" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local service_file="src/services/user.service.ts"
  assert_file_contains "$service_file" "import type {"
  assert_file_contains "$service_file" "} from '@/dto/user.dto'"
}

@test "[Import] Service가 Types import" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local service_file="src/services/user.service.ts"
  assert_file_contains "$service_file" "import type { UserFilter } from '@/types/user'"
}

@test "[Import] DTO가 Types import" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local dto_file="src/dto/user.dto.ts"
  assert_file_contains "$dto_file" "import type { User } from '@/types/user'"
}

@test "[Import] Repository가 Types import" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local repo_file="src/repositories/user.repository.ts"
  assert_file_contains "$repo_file" "import type { User, UserFilter } from '@/types/user'"
}

# ============================================================
# Types 파일 내용 테스트
# ============================================================

@test "[Types] 기본 엔티티 인터페이스 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local types_file="src/types/user.ts"
  assert_file_contains "$types_file" "export interface User {"
  assert_file_contains "$types_file" "id: string"
  assert_file_contains "$types_file" "name: string"
  assert_file_contains "$types_file" "createdAt: Date"
  assert_file_contains "$types_file" "updatedAt: Date"
}

@test "[Types] Filter 인터페이스 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local types_file="src/types/user.ts"
  assert_file_contains "$types_file" "export interface UserFilter {"
  assert_file_contains "$types_file" "search?: string"
  assert_file_contains "$types_file" "page?: number"
  assert_file_contains "$types_file" "limit?: number"
}

@test "[Types] SortBy 타입 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local types_file="src/types/user.ts"
  assert_file_contains "$types_file" "export type UserSortBy"
}

# ============================================================
# DTO 파일 내용 테스트
# ============================================================

@test "[DTO] Create DTO 인터페이스 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local dto_file="src/dto/user.dto.ts"
  assert_file_contains "$dto_file" "export interface CreateUserDTO {"
}

@test "[DTO] Update DTO 인터페이스 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local dto_file="src/dto/user.dto.ts"
  assert_file_contains "$dto_file" "export interface UpdateUserDTO {"
}

@test "[DTO] Response DTO 인터페이스 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local dto_file="src/dto/user.dto.ts"
  assert_file_contains "$dto_file" "export interface UserResponseDTO {"
}

@test "[DTO] List Response DTO 인터페이스 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local dto_file="src/dto/user.dto.ts"
  assert_file_contains "$dto_file" "export interface UserListResponseDTO {"
  assert_file_contains "$dto_file" "items: UserResponseDTO[]"
  assert_file_contains "$dto_file" "total: number"
  assert_file_contains "$dto_file" "totalPages: number"
}

@test "[DTO] Entity to DTO 변환 함수 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local dto_file="src/dto/user.dto.ts"
  assert_file_contains "$dto_file" "export function toUserResponseDTO"
  assert_file_contains "$dto_file" "createdAt: entity.createdAt.toISOString()"
}

# ============================================================
# Repository 파일 내용 테스트
# ============================================================

@test "[Repository] CRUD 메서드 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local repo_file="src/repositories/user.repository.ts"
  assert_file_contains "$repo_file" "async findById"
  assert_file_contains "$repo_file" "async findAll"
  assert_file_contains "$repo_file" "async create"
  assert_file_contains "$repo_file" "async update"
  assert_file_contains "$repo_file" "async delete"
}

@test "[Repository] count 메서드 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local repo_file="src/repositories/user.repository.ts"
  assert_file_contains "$repo_file" "async count"
}

@test "[Repository] 클래스 정의 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local repo_file="src/repositories/user.repository.ts"
  assert_file_contains "$repo_file" "export class UserRepository {"
}

# ============================================================
# Service 파일 내용 테스트
# ============================================================

@test "[Service] 비즈니스 메서드 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local service_file="src/services/user.service.ts"
  assert_file_contains "$service_file" "async getUserById"
  assert_file_contains "$service_file" "async getUserList"
  assert_file_contains "$service_file" "async createUser"
  assert_file_contains "$service_file" "async updateUser"
  assert_file_contains "$service_file" "async deleteUser"
}

@test "[Service] 에러 처리 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local service_file="src/services/user.service.ts"
  assert_file_contains "$service_file" "throw new Error"
  assert_file_contains "$service_file" "찾을 수 없습니다"
}

@test "[Service] DTO 변환 로직 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local service_file="src/services/user.service.ts"
  assert_file_contains "$service_file" "toUserResponseDTO"
  assert_file_contains "$service_file" "items.map(toUserResponseDTO)"
}

@test "[Service] 페이지네이션 로직 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local service_file="src/services/user.service.ts"
  assert_file_contains "$service_file" "totalPages = Math.ceil"
}

@test "[Service] 클래스 정의 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local service_file="src/services/user.service.ts"
  assert_file_contains "$service_file" "export class UserService {"
}

# ============================================================
# 코드 품질 테스트
# ============================================================

@test "[코드품질] TypeScript 타입 안전성 - any 타입 미사용" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  assert_file_not_contains "src/services/user.service.ts" ": any"
  assert_file_not_contains "src/repositories/user.repository.ts" ": any"
  assert_file_not_contains "src/dto/user.dto.ts" ": any"
  assert_file_not_contains "src/types/user.ts" ": any"
}

@test "[코드품질] 한국어 주석 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  assert_file_contains "src/services/user.service.ts" "비즈니스 로직"
  assert_file_contains "src/repositories/user.repository.ts" "데이터 접근 레이어"
}

@test "[코드품질] JSDoc 스타일 주석 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  local service_file="src/services/user.service.ts"
  assert_file_contains "$service_file" "/**"
  assert_file_contains "$service_file" "*/"
}

@test "[코드품질] 모든 파일에 TypeScript import 포함" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  assert_valid_typescript "src/services/user.service.ts"
  assert_valid_typescript "src/repositories/user.repository.ts"
  assert_valid_typescript "src/dto/user.dto.ts"
  assert_valid_typescript "src/types/user.ts"
}

# ============================================================
# 파일 덮어쓰기 테스트
# ============================================================

@test "[덮어쓰기] 기존 파일 존재 시 경고 메시지" {
  # 먼저 파일 생성
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  # 다시 같은 이름으로 실행
  run bash -c "echo n | bash '$COMMAND_PATH' user 2>&1"

  # 경고 메시지 확인
  assert_output_contains "이미 존재합니다"
}

@test "[덮어쓰기] 취소 시 파일 내용 유지" {
  # 먼저 파일 생성
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  # 원본 파일 내용 저장
  local original_content=$(cat "src/services/user.service.ts")

  # n 입력으로 취소
  run bash -c "echo n | bash '$COMMAND_PATH' user 2>&1"

  # 파일 내용 변경되지 않았는지 확인
  local current_content=$(cat "src/services/user.service.ts")
  [ "$original_content" = "$current_content" ]
}

# ============================================================
# 출력 메시지 테스트
# ============================================================

@test "[출력] 성공 메시지 출력" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>&1"

  assert_output_contains "API 레이어 생성이 완료되었습니다"
}

@test "[출력] 생성된 파일 목록 출력" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>&1"

  assert_output_contains "src/types/user.ts"
  assert_output_contains "src/dto/user.dto.ts"
  assert_output_contains "src/repositories/user.repository.ts"
  assert_output_contains "src/services/user.service.ts"
}

@test "[출력] 아키텍처 설명 출력" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>&1"

  assert_output_contains "Controller"
  assert_output_contains "Service"
  assert_output_contains "Repository"
}

@test "[출력] 다음 단계 안내" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>&1"

  assert_output_contains "다음 단계"
}

# ============================================================
# 통합 테스트
# ============================================================

@test "[통합] 전체 워크플로우 - user API 레이어 생성" {
  run bash -c "yes n | bash '$COMMAND_PATH' user 2>/dev/null || true"

  # 파일 존재 확인
  assert_file_exists "src/types/user.ts"
  assert_file_exists "src/dto/user.dto.ts"
  assert_file_exists "src/repositories/user.repository.ts"
  assert_file_exists "src/services/user.service.ts"

  # Types 검증
  assert_file_contains "src/types/user.ts" "export interface User"

  # DTO 검증
  assert_file_contains "src/dto/user.dto.ts" "export interface CreateUserDTO"
  assert_file_contains "src/dto/user.dto.ts" "export function toUserResponseDTO"

  # Repository 검증
  assert_file_contains "src/repositories/user.repository.ts" "export class UserRepository"
  assert_file_contains "src/repositories/user.repository.ts" "export const userRepository"

  # Service 검증
  assert_file_contains "src/services/user.service.ts" "export class UserService"
  assert_file_contains "src/services/user.service.ts" "export const userService"
  assert_file_contains "src/services/user.service.ts" "import { userRepository }"
}

@test "[통합] 전체 워크플로우 - product-category API 레이어 생성 (하이픈 포함)" {
  run bash -c "yes n | bash '$COMMAND_PATH' product-category 2>/dev/null || true"

  # 파일 존재 확인
  assert_file_exists "src/services/product-category.service.ts"
  assert_file_exists "src/repositories/product-category.repository.ts"

  # PascalCase 변환 확인
  assert_file_contains "src/services/product-category.service.ts" "export class ProductCategoryService"
  assert_file_contains "src/repositories/product-category.repository.ts" "export class ProductCategoryRepository"

  # camelCase 싱글톤 확인
  assert_file_contains "src/services/product-category.service.ts" "export const productCategoryService"
  assert_file_contains "src/repositories/product-category.repository.ts" "export const productCategoryRepository"

  # Import 경로 확인
  assert_file_contains "src/services/product-category.service.ts" "@/repositories/product-category.repository"
  assert_file_contains "src/services/product-category.service.ts" "@/dto/product-category.dto"
}
