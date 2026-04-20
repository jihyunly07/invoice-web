/**
 * Notion 클라이언트 초기화 및 환경 변수 검증
 */

import { Client } from '@notionhq/client';
import { config } from '@/lib/config';

/**
 * 환경 변수 검증 - 누락된 경우 에러 발생
 */
function validateEnv(): void {
  if (!config.notion.apiKey) {
    throw new Error('NOTION_API_KEY 환경 변수가 설정되지 않았습니다.');
  }
  if (!config.notion.databaseId) {
    throw new Error('NOTION_DATABASE_ID 환경 변수가 설정되지 않았습니다.');
  }
}

/**
 * Notion 클라이언트 싱글턴
 * 서버 사이드에서만 사용 (API 키 보호)
 */
let notionClient: Client | null = null;

export function getNotionClient(): Client {
  if (!notionClient) {
    validateEnv();
    notionClient = new Client({
      auth: config.notion.apiKey,
    });
  }
  return notionClient;
}

/**
 * 독서 기록 데이터베이스 ID
 */
export const DATABASE_ID = config.notion.databaseId;
