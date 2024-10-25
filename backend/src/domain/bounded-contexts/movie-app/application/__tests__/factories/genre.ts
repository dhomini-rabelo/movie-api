import { Factory } from '@tests/types/factory'
import { some } from '@tests/utils/some'

import { Genre, GenreProps } from '../../../enterprise/entities/genre'
import { GenreRepository } from '../../repositories/genre'

export function createGenreData({
  name = some.text(),
}: Partial<GenreProps> = {}): GenreProps {
  return {
    name,
  }
}

export class GenreFactory implements Factory<Genre> {
  constructor(private genreRepository: GenreRepository) {}

  async create(data: Partial<GenreProps> = {}) {
    return this.genreRepository.create(createGenreData(data))
  }
}
