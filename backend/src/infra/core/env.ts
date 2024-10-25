import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  CREATE_USER_ACCESS_TOKEN: z.string(),
  API_PORT: z.coerce.number().optional().default(5000),
})

export type Env = z.infer<typeof envSchema>