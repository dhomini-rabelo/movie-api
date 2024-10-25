export type ExpiredTokenState = {
  value: null
  expired: true
}

export type ValidTokenState = {
  value: string
  expired: false
}

export abstract class JWTModule {
  constructor(
    public readonly settings: Readonly<{
      expirationTimeInMs: number
      secretKey: string
    }>,
  ) {}

  abstract generateToken(value: string): string
  abstract getState(token: string): ExpiredTokenState | ValidTokenState
}
