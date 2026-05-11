import { envSchema } from './env.schema';

export const validateEnv = (config: Record<string, unknown>) => {
  return envSchema.parse(config);
};
