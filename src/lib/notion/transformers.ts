/**
 * Notion API 응답 → 도메인 타입 변환 함수
 */

import type { Book, ReadingStatus } from '@/types/book';
import type {
  NotionPage,
  NotionTitleProperty,
  NotionRichTextProperty,
  NotionSelectProperty,
  NotionMultiSelectProperty,
  NotionNumberProperty,
  NotionDateProperty,
} from '@/types/notion';

/**
 * Title 속성에서 텍스트 추출
 */
export function extractTitle(property: NotionTitleProperty): string {
  return property.title[0]?.plain_text ?? '';
}

/**
 * Rich Text 속성에서 텍스트 추출
 */
export function extractRichText(property: NotionRichTextProperty): string | null {
  const text = property.rich_text[0]?.plain_text;
  return text || null;
}

/**
 * Select 속성에서 값 추출
 */
export function extractSelect(property: NotionSelectProperty): string | null {
  return property.select?.name ?? null;
}

/**
 * Multi-select 속성에서 값 배열 추출
 */
export function extractMultiSelect(property: NotionMultiSelectProperty): string[] {
  return property.multi_select.map((item) => item.name);
}

/**
 * Number 속성에서 값 추출
 */
export function extractNumber(property: NotionNumberProperty): number | null {
  return property.number;
}

/**
 * Date 속성에서 시작 날짜 추출 (ISO 8601 문자열)
 */
export function extractDate(property: NotionDateProperty): string | null {
  return property.date?.start ?? null;
}

/**
 * Select 값을 ReadingStatus 타입으로 변환
 */
function toReadingStatus(value: string | null): ReadingStatus {
  if (value === 'wishlist' || value === 'reading' || value === 'completed') {
    return value;
  }
  // 기본값: 알 수 없는 상태는 wishlist로 처리
  return 'wishlist';
}

/**
 * Notion 페이지 → Book 타입 변환
 */
export function transformNotionPageToBook(page: NotionPage): Book {
  const props = page.properties;

  return {
    id: page.id,
    title: extractTitle(props['Name'] as NotionTitleProperty),
    author: extractRichText(props['Author'] as NotionRichTextProperty) ?? '',
    status: toReadingStatus(extractSelect(props['Status'] as NotionSelectProperty)),
    rating: extractNumber(props['Rating'] as NotionNumberProperty),
    readDate: extractDate(props['ReadDate'] as NotionDateProperty),
    review: extractRichText(props['Review'] as NotionRichTextProperty),
    tags: extractMultiSelect(props['Tags'] as NotionMultiSelectProperty),
  };
}
