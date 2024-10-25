import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import * as zod from 'zod';
import { JwtAuthGuard } from "@/infra/http/auth/jwt-guard";
import { ZodValidationPipe } from "@/infra/http/pipes/zod";
import { VotePresenter } from "@/infra/http/presenters/vote";
import { VoteUseCase } from "@/domain/bounded-contexts/movie-app/application/use-cases/movie/vote/vote";
import { UserSub } from "@/infra/http/auth/user-sub";
import { UserTokenSchema } from "@/infra/http/auth/auth.strategy";
import { DuplicatedVoteError } from "@/domain/bounded-contexts/movie-app/application/use-cases/movie/vote/errors/duplicated-vote";

const voteDTO = zod.object({
  movieId: zod.string().uuid(),
  rating: zod.number().int().min(1).max(5),
});

type VoteDTO = {
  movieId: string;
  rating: number;
}

@Controller('/movie-app/movie/vote')
@UseGuards(JwtAuthGuard)
export class VoteController {

  constructor(
    private readonly useCase: VoteUseCase,
  ){}

  @Post()
  async handle(
    @UserSub() userSub: UserTokenSchema,
    @Body(new ZodValidationPipe(voteDTO)) body: VoteDTO,
  ) {
    try {
      const newVote = await this.useCase.execute({
        ...body,
        customerId: userSub.value,
      })
  
      return VotePresenter.toHttp(newVote);
    } catch (error) {
      if(error instanceof DuplicatedVoteError) {
        return {
          message: error.message,
        }
      }

      throw error;
    }
  }

}
