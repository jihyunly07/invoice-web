/**
 * 반응형 미디어 쿼리 훅
 * react-responsive 라이브러리 활용
 */

'use client';

import { useMediaQuery as useResponsive } from 'react-responsive';

/**
 * 미디어 쿼리 훅
 * @param query 미디어 쿼리 문자열
 */
export function useMediaQuery(query: string) {
  return useResponsive({ query });
}

/**
 * 모바일 감지 (768px 미만)
 */
export const useIsMobile = () => useResponsive({ maxWidth: 767 });

/**
 * 태블릿 감지 (768px ~ 1023px)
 */
export const useIsTablet = () => useResponsive({ minWidth: 768, maxWidth: 1023 });

/**
 * 데스크톱 감지 (1024px 이상)
 */
export const useIsDesktop = () => useResponsive({ minWidth: 1024 });
