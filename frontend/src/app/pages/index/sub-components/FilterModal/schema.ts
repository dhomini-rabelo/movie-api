import * as zod from 'zod'

export const FilterSchema = zod.object({
  name: zod.string().optional(),
  actorId: zod.string().optional(),
  genreId: zod.string().optional(),
  directorId: zod.string().optional(),
})

export type FilterSchemaType = zod.infer<typeof FilterSchema>
