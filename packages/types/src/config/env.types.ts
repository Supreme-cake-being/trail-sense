import { z } from 'zod';

export type Env = z.infer<typeof envSchema>;
