/**
 * Custom Hooks Export
 * 검증된 라이브러리 기반 훅 모음
 */

// 자체 래핑 훅
export * from './use-media-query';
export * from './use-debounce';
export * from './use-local-storage';
export * from './use-intersection-observer';

// usehooks-ts 추가 유용한 훅들
export {
  useOnClickOutside,    // 외부 클릭 감지
  useEventListener,     // 이벤트 리스너
  useIsClient,          // SSR 감지
  useCopyToClipboard,   // 클립보드 복사
  useWindowSize,        // 윈도우 사이즈
  useToggle,            // 토글 상태
  useCounter,           // 카운터
  useInterval,          // 인터벌
  useTimeout,           // 타임아웃
  useBoolean,           // 불린 상태
} from 'usehooks-ts';
