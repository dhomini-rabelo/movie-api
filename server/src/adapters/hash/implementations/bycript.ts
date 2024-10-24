import { HashModule } from '..'

import bcrypt from 'bcrypt'

export class BCryptHashModule implements HashModule {
  protected readonly saltRounds = 7

  generate(input: string): string {
    return bcrypt.hashSync(input, this.saltRounds)
  }

  compare(input: string, hashForCompare: string): boolean {
    return bcrypt.compareSync(input, hashForCompare)
  }
}
