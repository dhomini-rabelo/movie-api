import { z } from 'zod'


const ONE_WEEK_IN_MS = 60 * 60 * 24 * 7 * 1000

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  CREATE_USER_ADMIN_ACCESS_TOKEN: z.string(),
  API_PORT: z.coerce.number().optional().default(5000),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION_TIME_IN_MS: z.coerce.number().optional().default(ONE_WEEK_IN_MS),
})

export type Env = {
  DATABASE_URL: string
  CREATE_USER_ADMIN_ACCESS_TOKEN: string
  API_PORT: number
  JWT_SECRET: string
  JWT_EXPIRATION_TIME_IN_MS: number
}