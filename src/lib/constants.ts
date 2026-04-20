/**
 * 애플리케이션 상수
 */

/**
 * 라우트 경로
 */
export const ROUTES = {
  HOME: '/',
  BOOKS: '/books',
} as const;

/**
 * Tailwind CSS Breakpoints
 */
export const BREAKPOINTS = {
  sm: 640,    // 모바일
  md: 768,    // 태블릿
  lg: 1024,   // 작은 데스크톱
  xl: 1280,   // 데스크톱
  '2xl': 1536 // 큰 데스크톱
} as const;

/**
 * 독서 상태 필터
 */
export const READING_STATUS = {
  ALL: 'all',
  WISHLIST: 'wishlist',
  READING: 'reading',
  COMPLETED: 'completed',
} as const;

/**
 * 독서 상태 라벨
 */
export const READING_STATUS_LABEL = {
  [READING_STATUS.ALL]: '전체',
  [READING_STATUS.WISHLIST]: '읽고싶음',
  [READING_STATUS.READING]: '읽는중',
  [READING_STATUS.COMPLETED]: '완독',
} as const;
