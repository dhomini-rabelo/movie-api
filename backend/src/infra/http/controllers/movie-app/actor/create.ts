import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import * as zod from 'zod';
import { JwtAuthGuard } from "@/infra/http/auth/jwt-guard";
import { ZodValidationPipe } from "@/infra/http/pipes/zod";
import { CreateActorUseCase } from "@/domain/bounded-contexts/movie-app/application/use-cases/actor/create";
import { ActorPresenter } from "@/infra/http/presenters/actor";

const createActorDTO = zod.object({
  name: zod.string(),
  avatarURL: zod.string().url(),
});

type CreateActorDTO = {
  name: string;
  avatarURL: string;
}

@Controller('/movie-app/actor/create')
@UseGuards(JwtAuthGuard)
export class CreateActorController {

  constructor(
    private readonly useCase: CreateActorUseCase,
  ){}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createActorDTO)) body: CreateActorDTO,
  ) {
    const newActor = await this.useCase.execute({
      ...body,
    })

    return ActorPresenter.toHttp(newActor);
  }

}
