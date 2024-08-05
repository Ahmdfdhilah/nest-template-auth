import { z } from 'zod';

export const CreateUserDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string(),
});

export type CreateUserDtoType = z.infer<typeof CreateUserDto>;