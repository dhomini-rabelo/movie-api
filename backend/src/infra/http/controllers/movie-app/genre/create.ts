import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import * as zod from 'zod';
import { JwtAuthGuard } from "@/infra/http/auth/jwt-guard";
import { ZodValidationPipe } from "@/infra/http/pipes/zod";
import { GenrePresenter } from "@/infra/http/presenters/genre";
import { CreateGenreUseCase } from "@/domain/bounded-contexts/movie-app/application/use-cases/genre/create";

const createGenreDTO = zod.object({
  name: zod.string(),
});

type CreateGenreDTO = {
  name: string;
}

@Controller('/movie-app/genre/create')
@UseGuards(JwtAuthGuard)
export class CreateGenreController {

  constructor(
    private readonly useCase: CreateGenreUseCase,
  ){}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createGenreDTO)) body: CreateGenreDTO,
  ) {
    const newGenre = await this.useCase.execute({
      ...body,
    })

    return GenrePresenter.toHttp(newGenre);
  }

}
