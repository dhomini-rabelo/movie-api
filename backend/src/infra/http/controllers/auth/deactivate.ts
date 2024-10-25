import { Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/jwt-guard";
import { UserSub } from "../../auth/user-sub";
import { UserTokenSchema } from "../../auth/auth.strategy";
import { UserPresenter } from "../../presenters/user";
import { DeactivateUserUseCase } from "@/domain/bounded-contexts/auth/application/use-cases/deactivate/deactivate";


@Controller('/auth/deactivate')
@UseGuards(JwtAuthGuard)
export class DeactivateUserController {

  constructor(
    private readonly useCase: DeactivateUserUseCase,
  ){}

  @Post()
  async handle(
    @UserSub() userSub: UserTokenSchema,
  ) {
    const updatedUser = await this.useCase.execute({
      id: userSub.value,
    })

    return UserPresenter.toHttp(updatedUser);
  }

}