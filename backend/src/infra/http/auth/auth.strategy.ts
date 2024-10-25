import { EnvService } from '@/infra/services/env'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { z } from 'zod'

const userTokenSchema = z.object({
  value: z.string().uuid(),
})

export type UserTokenSchema = z.infer<typeof userTokenSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(env: EnvService) {
    const jwtSecret = env.get('JWT_SECRET')

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(jwtSecret, 'utf8'),
    })
  }

  async validate(payload: UserTokenSchema) {
    return userTokenSchema.parse(payload)
  }
}