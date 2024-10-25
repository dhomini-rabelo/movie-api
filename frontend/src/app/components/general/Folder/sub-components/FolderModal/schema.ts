import * as zod from 'zod'
import { ErrorMessages } from '../../../../../utils/errors'

export const FolderSchema = zod.object({
  name: zod.string().min(1, ErrorMessages.REQUIRED),
  description: zod.string().min(1, ErrorMessages.REQUIRED),
})

export type FolderSchemaType = zod.infer<typeof FolderSchema>
