import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import * as zod from 'zod';
import { JwtAuthGuard } from "@/infra/http/auth/jwt-guard";
import { ZodValidationPipe } from "@/infra/http/pipes/zod";
import { ListMoviesUseCase } from "@/domain/bounded-contexts/movie-app/application/use-cases/movie/list";
import { HttpStatusCode } from "@/infra/lib/http";
import { MoviePresenter } from "@/infra/http/presenters/movie";

const listMovieDTO = zod.object({
  name: zod.string().optional(),
  genreId: zod.string().uuid().optional(),
  actorId: zod.string().uuid().optional(),
  directorId: zod.string().uuid().optional(),
});

type ListMovieDTO = {
  name?: string
  genreId?: string
  actorId?: string
  directorId?: string
}

@Controller('/movie-app/movie/list')
@UseGuards(JwtAuthGuard)
export class ListMovieController {

  constructor(
    private readonly useCase: ListMoviesUseCase,
  ){}

  @Post()
  @HttpCode(HttpStatusCode.OK)
  async handle(
    @Body(new ZodValidationPipe(listMovieDTO)) body: ListMovieDTO,
  ) {
    const movies = await this.useCase.execute({
      ...body,
    })

    return movies.map(MoviePresenter.toHttpSimpleData)
  }
}
