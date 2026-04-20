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
