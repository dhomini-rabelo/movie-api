import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import * as zod from 'zod';
import { JwtAuthGuard } from "@/infra/http/auth/jwt-guard";
import { ZodValidationPipe } from "@/infra/http/pipes/zod";
import { MoviePresenter } from "@/infra/http/presenters/movie";
import { CreateMovieUseCase } from "@/domain/bounded-contexts/movie-app/application/use-cases/movie/create";

const createMovieDTO = zod.object({
  name: zod.string(),
  actorsId: zod.array(zod.string().uuid()),
  directorsId: zod.array(zod.string().uuid()),
  genresId: zod.array(zod.string().uuid()),
});

type CreateMovieDTO = {
  name: string;
  actorsId: string[];
  directorsId: string[];
  genresId: string[];
}

@Controller('/movie-app/movie/create')
@UseGuards(JwtAuthGuard)
export class CreateMovieController {

  constructor(
    private readonly useCase: CreateMovieUseCase,
  ){}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createMovieDTO)) body: CreateMovieDTO,
  ) {
    const newMovie = await this.useCase.execute({
      ...body,
    })

    return MoviePresenter.toHttp(newMovie);
  }
}
