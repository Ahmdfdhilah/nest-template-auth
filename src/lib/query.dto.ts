import { z } from 'zod';

export const QuerySchema = z.object({
  search: z.string().optional(),
  sort: z.string().optional(),
  order: z.enum(['ASC', 'DESC']).optional(),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).optional().default(10),
});

export type QueryDto = z.infer<typeof QuerySchema>;