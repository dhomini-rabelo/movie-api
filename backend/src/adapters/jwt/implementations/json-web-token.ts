import * as jwt from 'jsonwebtoken'

import { ExpiredTokenState, JWTModule, ValidTokenState } from '../index.'

type TokenFormat = { value: string }

export class JsonWebTokenJWTModule extends JWTModule {
  generateToken(userId: string) {
    return jwt.sign(this.formatToken(userId), this.settings.secretKey, {
      expiresIn: String(this.settings.expirationTimeInMs),
    })
  }

  getState(token: string) {
    try {
      const data = jwt.verify(token, this.settings.secretKey) as TokenFormat
      return {
        value: data.value,
        expired: false,
      } as ValidTokenState
    } catch {
      return {
        value: null,
        expired: true,
      } as ExpiredTokenState
    }
  }

  private formatToken(value: string): TokenFormat {
    return { value }
  }
}
