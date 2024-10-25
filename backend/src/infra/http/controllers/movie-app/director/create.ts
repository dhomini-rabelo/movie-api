import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import * as zod from 'zod';
import { JwtAuthGuard } from "@/infra/http/auth/jwt-guard";
import { ZodValidationPipe } from "@/infra/http/pipes/zod";
import { DirectorPresenter } from "@/infra/http/presenters/director";
import { CreateDirectorUseCase } from "@/domain/bounded-contexts/movie-app/application/use-cases/director/create";

const createDirectorDTO = zod.object({
  name: zod.string(),
  avatarURL: zod.string().url(),
});

type CreateDirectorDTO = {
  name: string;
  avatarURL: string;
}

@Controller('/movie-app/director/create')
@UseGuards(JwtAuthGuard)
export class CreateDirectorController {

  constructor(
    private readonly useCase: CreateDirectorUseCase,
  ){}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createDirectorDTO)) body: CreateDirectorDTO,
  ) {
    const newDirector = await this.useCase.execute({
      ...body,
    })

    return DirectorPresenter.toHttp(newDirector);
  }

}
