import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { UserTokenSchema } from './auth.strategy'

export const UserSub = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    return request.user as UserTokenSchema
  },
)