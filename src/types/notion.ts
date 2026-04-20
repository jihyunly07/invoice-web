/**
 * Notion API 전용 타입 정의
 */

import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

/**
 * Notion 페이지 타입 (전체 응답)
 */
export type NotionPage = PageObjectResponse;

/**
 * Notion 속성 타입들
 */
export type NotionTitleProperty = Extract<
  PageObjectResponse['properties'][string],
  { type: 'title' }
>;

export type NotionRichTextProperty = Extract<
  PageObjectResponse['properties'][string],
  { type: 'rich_text' }
>;

export type NotionSelectProperty = Extract<
  PageObjectResponse['properties'][string],
  { type: 'select' }
>;

export type NotionMultiSelectProperty = Extract<
  PageObjectResponse['properties'][string],
  { type: 'multi_select' }
>;

export type NotionNumberProperty = Extract<
  PageObjectResponse['properties'][string],
  { type: 'number' }
>;

export type NotionDateProperty = Extract<
  PageObjectResponse['properties'][string],
  { type: 'date' }
>;
