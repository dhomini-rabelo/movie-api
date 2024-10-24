import { ID } from '@/domain/core/entities/id'

export function createID(value?: string) {
  return new ID(value)
}
