/**
 * 도서 관련 Zod 스키마 정의
 */

import { z } from 'zod';

/**
 * 독서 상태 스키마
 */
export const readingStatusSchema = z.enum(['wishlist', 'reading', 'completed']);

/**
 * 도서 스키마
 */
export const bookSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  author: z.string().min(1),
  status: readingStatusSchema,
  rating: z.number().min(0).max(5).nullable(),
  readDate: z.string().nullable(),
  review: z.string().nullable(),
  tags: z.array(z.string()),
});

/**
 * 스키마에서 추출한 타입 (Book 타입과 동일해야 함)
 */
export type BookSchema = z.infer<typeof bookSchema>;
