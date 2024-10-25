import { Body, Controller, Post } from "@nestjs/common";
import * as zod from 'zod';
import { ZodValidationPipe } from "@/infra/http/pipes/zod";
import { GetMovieDetailsUseCase } from "@/domain/bounded-contexts/movie-app/application/use-cases/movie/get-details";
import { DirectorPresenter } from "@/infra/http/presenters/director";
import { GenrePresenter } from "@/infra/http/presenters/genre";
import { ActorPresenter } from "@/infra/http/presenters/actor";

const getDetailsDTO = zod.object({
  id: zod.string().uuid(),
});

type getDetailsDTO = {
  id: string;
}

@Controller('/movie-app/movie/get-details')
export class GetMovieDetailsController {

  constructor(
    private readonly useCase: GetMovieDetailsUseCase,
  ){}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(getDetailsDTO)) body: getDetailsDTO,
  ) {
    const movie = await this.useCase.execute({
      ...body,
    })

    return this.toHttp(movie);
  }

  private toHttp(payload: Awaited<ReturnType<GetMovieDetailsUseCase['execute']>>) {
    return {
      id: payload.id.toString(),
      name: payload.name,
      year: payload.year,
      poster: payload.poster,
      description: payload.description,
      totalMinutes: payload.totalMinutes,
      directors: payload.directors.map(DirectorPresenter.toHttp),
      genres: payload.genres.map(GenrePresenter.toHttp),
      actors: payload.actors.map(ActorPresenter.toHttp),
      rating: payload.rating,
    }
  }
}
