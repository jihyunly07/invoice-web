/**
 * 공통 타입 정의
 */

/**
 * 상태 타입
 */
export type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * 정렬 방향
 */
export type SortDirection = 'asc' | 'desc';

/**
 * 페이지네이션 파라미터
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * 페이지네이션 메타 정보
 */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/**
 * 정렬 파라미터
 */
export interface SortParams<T = string> {
  field: T;
  direction: SortDirection;
}

/**
 * 필터 파라미터
 */
export interface FilterParams<T = Record<string, unknown>> {
  filters: T;
}
