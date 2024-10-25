import { Factory } from '@tests/types/factory'
import { some } from '@tests/utils/some'

import { Director, DirectorProps } from '../../../enterprise/entities/director'
import { DirectorRepository } from '../../repositories/director'

export function createDirectorData({
  name = some.text(),
  avatarURL = some.text(),
}: Partial<DirectorProps> = {}): DirectorProps {
  return {
    name,
    avatarURL,
  }
}

export class DirectorFactory implements Factory<Director> {
  constructor(private directorRepository: DirectorRepository) {}

  async create(data: Partial<DirectorProps> = {}) {
    return this.directorRepository.create(createDirectorData(data))
  }
}
