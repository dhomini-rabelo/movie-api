import * as zod from 'zod'
import { ErrorMessages } from '../../../../../utils/errors'

export const ShortcutSchema = zod.object({
  text: zod.string().min(1, ErrorMessages.REQUIRED),
})

export type ShortcutSchemaType = zod.infer<typeof ShortcutSchema>
