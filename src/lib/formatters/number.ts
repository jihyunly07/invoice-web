/**
 * 숫자 포맷팅 유틸리티
 */

/**
 * 숫자를 천단위 구분 기호로 포맷팅
 * @param value 숫자
 * @param options 옵션
 * @returns 포맷된 문자열
 */
export const formatNumber = (
  value: number,
  options?: Intl.NumberFormatOptions
): string => {
  return new Intl.NumberFormat('ko-KR', options).format(value);
};

/**
 * 통화 포맷팅 (원화)
 * @param value 숫자
 * @returns 포맷된 통화 문자열 (예: "₩1,000")
 */
export const formatCurrency = (value: number): string => {
  return formatNumber(value, {
    style: 'currency',
    currency: 'KRW',
  });
};

/**
 * 퍼센트 포맷팅
 * @param value 숫자 (0~1 또는 0~100)
 * @param asDecimal 0~1 사이 값 여부 (기본: false)
 * @returns 포맷된 퍼센트 문자열 (예: "50%")
 */
export const formatPercent = (
  value: number,
  asDecimal: boolean = false
): string => {
  const percent = asDecimal ? value : value / 100;
  return formatNumber(percent, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

/**
 * 파일 크기 포맷팅
 * @param bytes 바이트 크기
 * @returns 포맷된 파일 크기 문자열 (예: "1.5 MB")
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * 큰 숫자를 축약 포맷팅 (예: 1K, 1.5M)
 * @param value 숫자
 * @returns 축약된 문자열
 */
export const formatCompactNumber = (value: number): string => {
  if (value < 1000) return value.toString();

  return formatNumber(value, {
    notation: 'compact',
    compactDisplay: 'short',
  });
};

/**
 * 소수점 포맷팅
 * @param value 숫자
 * @param decimals 소수점 자릿수 (기본: 2)
 * @returns 포맷된 문자열
 */
export const formatDecimal = (
  value: number,
  decimals: number = 2
): string => {
  return formatNumber(value, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * 전화번호 포맷팅
 * @param value 전화번호 문자열
 * @returns 포맷된 전화번호 (예: "010-1234-5678")
 */
export const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }

  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  return value;
};
