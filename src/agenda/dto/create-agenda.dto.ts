import { z } from 'zod';

export const CreateAgendaDto = z.object({
    slug: z.string().nonempty(),
    author: z.string().nonempty(),
    date: z.string().datetime(),
    location: z.string().nonempty(),
    time: z.string().nonempty(),
    image: z.string().url().nullable(),
    title: z.string().nonempty(),
    body: z.string().nullable(),
});

export type CreateAgendaDto = z.infer<typeof CreateAgendaDto>;