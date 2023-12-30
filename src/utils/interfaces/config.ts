import { z } from 'zod';

export const ConfigSchema = z.object({
  PORT: z.number().int().positive(),
  EXTERNAL_API: z.string(),
});

export type AppConfig = z.infer<typeof ConfigSchema>;