import { PrismaService } from "../../prisma";
import { EntityWithStatic } from "@/domain/core/entities/base";
import { ID } from "@/domain/core/entities/id";
import { WithID } from "@/domain/core/entities/types";
import { Injectable } from "@nestjs/common";
import { RepeatedResource } from "@/domain/core/adapters/repository/errors/repeated-resource";
import { ResourceNotFoundError } from "@/domain/core/adapters/repository/errors/resource-not-found";
import { PrismaVoteMapper } from "./mapper";
import { VoteRepository } from "@/domain/bounded-contexts/movie-app/application/repositories/vote";
import { Vote, VoteProps } from "@/domain/bounded-contexts/movie-app/enterprise/entities/vote";


@Injectable()
export class PrismaVoteRepository implements VoteRepository {
  protected entity = Vote as unknown as EntityWithStatic<Vote>
  protected defaultQueryValues = {}

  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async getAverageRating(movieId: ID): Promise<number> {
    const votes = await this.prismaService.vote.findMany({
      where: {
        ...this.defaultQueryValues,
        movieId: movieId.toValue(),
      },
    });

    const totalRating = votes.reduce((acc, vote) => acc + vote.rating, 0);
    return Math.round((totalRating / votes.length) * 100) / 100;
  }

  async create(props: VoteProps): Promise<Vote> {
    const vote = await this.prismaService.vote.create({
      data: PrismaVoteMapper.toInfraProps(props),
    });
    return PrismaVoteMapper.toDomain(vote);
  }

  async save(entity: Vote): Promise<Vote> {
    const vote = await this.prismaService.vote.create({
      data: PrismaVoteMapper.toInfra(entity),
    });
    return PrismaVoteMapper.toDomain(vote);
  }

  async update(id: ID, newProps: Partial<VoteProps>): Promise<Vote> {
    const vote = await this.prismaService.vote.update({
      where: { id: id.toValue() },
      data: PrismaVoteMapper.toInfraPropsPartial(newProps),
    });
    return PrismaVoteMapper.toDomain(vote);
  }

  async get(props: Partial<WithID<VoteProps>>): Promise<Vote> {
    const votes = await this.prismaService.vote.findMany({
      where: {
        ...this.defaultQueryValues,
        ...PrismaVoteMapper.toInfraPropsPartial(props),
      },
    });

    if (votes.length > 1) {
      throw new RepeatedResource()
    } else if (votes.length === 0) {
      throw new ResourceNotFoundError(this.entity)
    }

    const vote = votes[0];
    
    return PrismaVoteMapper.toDomain(vote)
  }

  async findUnique(props: Partial<WithID<VoteProps>>): Promise<Vote | null> {
    const votes = await this.prismaService.vote.findMany({
      where: {
        ...this.defaultQueryValues,
        ...PrismaVoteMapper.toInfraPropsPartial(props),
      },
    });


    if (votes.length > 1) {
      throw new RepeatedResource()
    }

    const vote = votes.length === 1 ? votes[0] : null;

    return vote ? PrismaVoteMapper.toDomain(vote) : null;
  }

  async findFirst(props: Partial<WithID<VoteProps>>): Promise<Vote | null> {
    const vote = await this.prismaService.vote.findFirst({
      where: {
        ...this.defaultQueryValues,
        ...PrismaVoteMapper.toInfraPropsPartial(props),
      },
    });

    return vote ? PrismaVoteMapper.toDomain(vote) : null;
  }

  async findMany(props: Partial<WithID<VoteProps>>): Promise<Vote[]> {
    const votes = await this.prismaService.vote.findMany({
      where: {
        ...this.defaultQueryValues,
        ...PrismaVoteMapper.toInfraPropsPartial(props),
      },
    });

    return votes.map((vote) => PrismaVoteMapper.toDomain(vote));
  }

  async reset(): Promise<void> {
    await this.prismaService.vote.deleteMany({});
  }
}
