/**
 * 날짜 포맷팅 유틸리티
 * date-fns 라이브러리 활용
 */

import { format, formatDistance, formatRelative, isValid } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 날짜 포맷팅
 * @param date 날짜 객체 또는 문자열
 * @param pattern 포맷 패턴 (기본: 'yyyy-MM-dd')
 * @returns 포맷된 날짜 문자열
 */
export const formatDate = (
  date: Date | string,
  pattern: string = 'yyyy-MM-dd'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (!isValid(dateObj)) {
    return '';
  }

  return format(dateObj, pattern, { locale: ko });
};

/**
 * 상대 시간 포맷팅 (예: "2시간 전")
 * @param date 날짜 객체 또는 문자열
 * @returns 상대 시간 문자열
 */
export const formatTimeAgo = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (!isValid(dateObj)) {
    return '';
  }

  return formatDistance(dateObj, new Date(), {
    addSuffix: true,
    locale: ko,
  });
};

/**
 * 상대 날짜 포맷팅 (예: "어제 오후 3:00")
 * @param date 날짜 객체 또는 문자열
 * @returns 상대 날짜 문자열
 */
export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (!isValid(dateObj)) {
    return '';
  }

  return formatRelative(dateObj, new Date(), { locale: ko });
};

/**
 * 날짜와 시간 포맷팅 (예: "2025년 1월 1일 오후 3:00")
 * @param date 날짜 객체 또는 문자열
 * @returns 포맷된 날짜/시간 문자열
 */
export const formatDateTime = (date: Date | string): string => {
  return formatDate(date, 'yyyy년 M월 d일 a h:mm');
};

/**
 * 시간만 포맷팅 (예: "15:30")
 * @param date 날짜 객체 또는 문자열
 * @returns 포맷된 시간 문자열
 */
export const formatTime = (date: Date | string): string => {
  return formatDate(date, 'HH:mm');
};

/**
 * 월/일 포맷팅 (예: "1월 1일")
 * @param date 날짜 객체 또는 문자열
 * @returns 포맷된 월/일 문자열
 */
export const formatMonthDay = (date: Date | string): string => {
  return formatDate(date, 'M월 d일');
};
