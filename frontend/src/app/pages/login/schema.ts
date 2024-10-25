import { ErrorMessages } from '../../utils/errors'
import * as zod from 'zod'

export const LoginSchema = zod.object({
  email: zod
    .string()
    .min(1, {
      message: ErrorMessages.REQUIRED,
    })
    .email({
      message: ErrorMessages.INVALID_EMAIL,
    }),
  password: zod.string().min(1, {
    message: ErrorMessages.REQUIRED,
  }),
})

export type LoginSchemaType = zod.infer<typeof LoginSchema>
