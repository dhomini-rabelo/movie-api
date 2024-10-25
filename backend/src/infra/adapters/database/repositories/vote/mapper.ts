import { Vote, VoteProps } from "@/domain/bounded-contexts/movie-app/enterprise/entities/vote";
import { WithID } from "@/domain/core/entities/types";
import { removeKeysForUndefinedValues } from "@/infra/lib/utils";
import { Vote as PrismaVote } from '@prisma/client';
import { createID } from "@tests/utils/domain";

export class PrismaVoteMapper {
  static toDomain(vote: PrismaVote): Vote {
    return Vote.reference(createID(vote.id), {
      customerId: createID(vote.customerId),
      movieId: createID(vote.movieId),
      rating: vote.rating,
    });
  }

  static toInfra(vote: Vote): PrismaVote {
    return {
      id: vote.id.toValue(),
      customerId: vote.props.customerId.toValue(),
      movieId: vote.props.movieId.toValue(),
      rating: vote.props.rating,
    };
  }

  static toInfraProps(voteProps: VoteProps) {
    return {
      customerId: voteProps.customerId.toValue(),
      movieId: voteProps.movieId.toValue(),
      rating: voteProps.rating,
    };
  }

  static toInfraPropsPartial(data: Partial<WithID<VoteProps>>) {
    return removeKeysForUndefinedValues({
      id: data.id?.toValue(),
      customerId: data.customerId?.toValue(),
      movieId: data.movieId?.toValue(),
      rating: data.rating,
    });
  }
}