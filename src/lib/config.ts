/**
 * 애플리케이션 설정
 */

export const config = {
  app: {
    name: '독서 기록',
    description: 'Notion을 활용한 나만의 독서 기록 및 위시리스트',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  notion: {
    apiKey: process.env.NOTION_API_KEY || '',
    databaseId: process.env.NOTION_DATABASE_ID || '',
  },
} as const;
