import { Body, Controller, ForbiddenException, Post, UseGuards } from "@nestjs/common";
import * as zod from 'zod';
import { JwtAuthGuard } from "@/infra/http/auth/jwt-guard";
import { ZodValidationPipe } from "@/infra/http/pipes/zod";
import { MoviePresenter } from "@/infra/http/presenters/movie";
import { CreateMovieUseCase } from "@/domain/bounded-contexts/movie-app/application/use-cases/movie/create/create";
import { UserSub } from "@/infra/http/auth/user-sub";
import { UserTokenSchema } from "@/infra/http/auth/auth.strategy";
import { ForbiddenNonAdminCustomer } from "@/domain/bounded-contexts/movie-app/application/use-cases/movie/create/errors/forbidden-non-admin-customer";

const createMovieDTO = zod.object({
  name: zod.string(),
  year: zod.number().int(),
  poster: zod.string().url(),
  description: zod.string(),
  totalMinutes: zod.number().int(),
  actorsId: zod.array(zod.string().uuid()),
  directorsId: zod.array(zod.string().uuid()),
  genresId: zod.array(zod.string().uuid()),
});

type CreateMovieDTO = {
  name: string;
  year: number;
  poster: string;
  description: string;
  totalMinutes: number;
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
    @UserSub() userSub: UserTokenSchema,
  ) {
    try {
      const newMovie = await this.useCase.execute({
        data: body,
        createdBy: userSub.value,
      })
  
      return MoviePresenter.toHttp(newMovie);
    } catch (error) {
      if (error instanceof ForbiddenNonAdminCustomer) {
        throw new ForbiddenException({
          message: 'Only admins can create movies',
        })
      }

      throw error;
    }
  }
}
