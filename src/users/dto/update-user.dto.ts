import { z } from 'zod';

export const UpdateUserDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string(),
});

export type UpdateUserDtoType = z.infer<typeof UpdateUserDto>;