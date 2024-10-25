import { Body, Controller, Post } from "@nestjs/common";
import * as zod from 'zod';
import { ZodValidationPipe } from "@/infra/http/pipes/zod";
import { GetMovieDetailsUseCase } from "@/domain/bounded-contexts/movie-app/application/use-cases/movie/get-details";

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
    return await this.useCase.execute({
      ...body,
    })
  }
}
