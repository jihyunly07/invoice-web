/**
 * 애플리케이션 상수
 */

/**
 * 라우트 경로
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  SETTINGS: '/settings',
  ABOUT: '/about',
  PRICING: '/pricing',
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
 * 네비게이션 메뉴 (헤더용)
 */
export const NAVIGATION_MENU = [
  {
    label: '홈',
    href: ROUTES.HOME,
  },
  {
    label: '소개',
    href: ROUTES.ABOUT,
  },
  {
    label: '가격',
    href: ROUTES.PRICING,
  },
] as const;

/**
 * 대시보드 네비게이션 메뉴 (사이드바용)
 */
export const DASHBOARD_MENU = [
  {
    label: '대시보드',
    href: ROUTES.DASHBOARD,
    icon: 'LayoutDashboard',
  },
  {
    label: '사용자',
    href: ROUTES.USERS,
    icon: 'Users',
  },
  {
    label: '설정',
    href: ROUTES.SETTINGS,
    icon: 'Settings',
  },
] as const;
