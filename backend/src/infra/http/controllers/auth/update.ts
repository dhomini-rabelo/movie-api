import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/jwt-guard";
import { UserSub } from "../../auth/user-sub";
import { UserTokenSchema } from "../../auth/auth.strategy";
import * as zod from 'zod';
import { ZodValidationPipe } from "../../pipes/zod";
import { UpdateUserUseCase } from "@/domain/bounded-contexts/auth/application/use-cases/update/update";
import { UserPresenter } from "../../presenters/user";

const updateUserDTO = zod.object({
  email: zod.string().email(),
});

type UpdateUserDTO = {
  email: string;
}

@Controller('/auth/update')
@UseGuards(JwtAuthGuard)
export class UpdateUserController {

  constructor(
    private readonly useCase: UpdateUserUseCase,
  ){}

  @Post()
  async handle(
    @UserSub() userSub: UserTokenSchema,
    @Body(new ZodValidationPipe(updateUserDTO)) body: UpdateUserDTO,
  ) {
    const updatedUser = await this.useCase.execute({
      id: userSub.value,
      data: body,
    })

    return UserPresenter.toHttp(updatedUser);
  }

}
