import { Injectable } from '@nestjs/common'
import { HashModule } from '..'
import * as bcrypt from 'bcrypt'

@Injectable()
export class BCryptHashModule extends HashModule {
  protected readonly saltRounds = 7

  generate(input: string): string {
    return bcrypt.hashSync(input, this.saltRounds)
  }

  compare(input: string, hashForCompare: string): boolean {
    return bcrypt.compareSync(input, hashForCompare)
  }
}
