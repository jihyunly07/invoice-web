/**
 * 도서 관련 타입 정의
 */

/**
 * 독서 상태 타입
 * constants.ts의 READING_STATUS 값과 일치 (all 제외)
 */
export type ReadingStatus = 'wishlist' | 'reading' | 'completed';

/**
 * 도서 필터 상태 타입 (목록 필터링 전용)
 * ReadingStatus에 'all'(전체) 포함
 */
export type ReadingStatusFilter = ReadingStatus | 'all';

/**
 * 도서 정보 인터페이스
 * Notion 데이터베이스의 한 레코드를 표현
 */
export interface Book {
  /** Notion 페이지 ID */
  id: string;
  /** 도서 제목 */
  title: string;
  /** 저자 */
  author: string;
  /** 독서 상태 */
  status: ReadingStatus;
  /** 평점 (0-5, null이면 미평가) */
  rating: number | null;
  /** 읽은 날짜 (ISO 8601 형식 문자열, null이면 미기록) */
  readDate: string | null;
  /** 한줄평 (null이면 미작성) */
  review: string | null;
  /** 태그 목록 */
  tags: string[];
}
