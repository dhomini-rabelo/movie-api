import { ErrorMessages } from '../../utils/errors'
import * as zod from 'zod'

export const LoginSchema = zod.object({
  username: zod.string().min(1, ErrorMessages.REQUIRED),
  password: zod.string().min(1, ErrorMessages.REQUIRED),
})

export type LoginSchemaType = zod.infer<typeof LoginSchema>
