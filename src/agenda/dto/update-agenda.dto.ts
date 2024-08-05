import { z } from 'zod';

export const UpdateAgendaDto = z.object({
    slug: z.string().optional(),
    author: z.string().optional(),
    date: z.string().datetime().optional(),
    location: z.string().optional(),
    time: z.string().optional(),
    image: z.string().url().nullable().optional(),
    title: z.string().optional(),
    body: z.string().nullable().optional(),
});

export type UpdateAgendaDto = z.infer<typeof UpdateAgendaDto>;