import { Entity } from '@/domain/core/entities/base'

export type Factory<EntityClass extends Entity> = {
  create: (data: Partial<EntityClass['props']>) => Promise<Entity>
}
