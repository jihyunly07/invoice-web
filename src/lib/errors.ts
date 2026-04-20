/**
 * 커스텀 에러 클래스 정의
 */

/**
 * Notion API 에러
 */
export class NotionAPIError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = 'NotionAPIError';
  }
}

/**
 * 데이터 변환 에러
 */
export class TransformError extends Error {
  constructor(
    message: string,
    public readonly field?: string,
  ) {
    super(message);
    this.name = 'TransformError';
  }
}

/**
 * 도서를 찾을 수 없는 에러
 */
export class BookNotFoundError extends NotionAPIError {
  constructor(id: string) {
    super(`도서를 찾을 수 없습니다: ${id}`, 'NOT_FOUND', 404);
    this.name = 'BookNotFoundError';
  }
}

/**
 * Notion API Rate Limit 에러
 */
export class RateLimitError extends NotionAPIError {
  constructor() {
    super('Notion API 요청 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.', 'rate_limited', 429);
    this.name = 'RateLimitError';
  }
}

/**
 * 네트워크 에러
 */
export class NetworkError extends Error {
  constructor(message = '네트워크 연결에 실패했습니다. 인터넷 연결을 확인해 주세요.') {
    super(message);
    this.name = 'NetworkError';
  }
}

/**
 * 에러에서 사용자 친화적 메시지 추출
 */
export function getUserFriendlyMessage(error: Error): string {
  if (error instanceof RateLimitError) {
    return 'Notion API 요청 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.';
  }
  if (error instanceof NetworkError) {
    return '네트워크 연결에 실패했습니다. 인터넷 연결을 확인해 주세요.';
  }
  if (error instanceof BookNotFoundError) {
    return '요청한 도서를 찾을 수 없습니다.';
  }
  if (error instanceof NotionAPIError) {
    if (error.status === 401 || error.status === 403) {
      return 'Notion API 인증에 실패했습니다. API 키를 확인해 주세요.';
    }
    if (error.status === 404) {
      return 'Notion 데이터베이스를 찾을 수 없습니다. 데이터베이스 ID를 확인해 주세요.';
    }
    return `Notion API 오류가 발생했습니다: ${error.message}`;
  }
  return error.message || '알 수 없는 오류가 발생했습니다.';
}
