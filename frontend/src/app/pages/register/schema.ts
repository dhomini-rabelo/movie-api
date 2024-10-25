import { ErrorMessages, DynamicErrorMessages } from '../../utils/errors'
import * as zod from 'zod'

export const RegisterUserSchema = zod
  .object({
    username: zod
      .string({
        required_error: ErrorMessages.REQUIRED,
        invalid_type_error: ErrorMessages.INVALID_VALUE,
      })
      .min(4, DynamicErrorMessages.minLength(4))
      .max(65, DynamicErrorMessages.maxLength(65))
      .regex(/^[a-zA-Z0-9-_]+$/, ErrorMessages.INVALID_CODE),
    password: zod.string().min(8, DynamicErrorMessages.minLength(8)),
    confirm_password: zod.string().min(1, ErrorMessages.REQUIRED),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: ErrorMessages.DUPLICATED_PASSWORD,
    path: ['confirm_password'], // field with error
  })

export type RegisterUserSchemaType = zod.infer<typeof RegisterUserSchema>
