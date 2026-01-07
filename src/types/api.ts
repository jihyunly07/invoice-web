/**
 * API 관련 타입 정의
 */

import { PaginationMeta } from './common';

/**
 * API 에러
 */
export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

/**
 * API 성공 응답
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

/**
 * API 에러 응답
 */
export interface ApiErrorResponse {
  success: false;
  error: ApiError;
}

/**
 * API 응답 (성공 또는 에러)
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * 페이지네이션된 API 응답
 */
export interface PaginatedApiResponse<T> {
  success: true;
  data: T[];
  pagination: PaginationMeta;
}

/**
 * HTTP 메서드
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * API 요청 옵션
 */
export interface ApiRequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
}
