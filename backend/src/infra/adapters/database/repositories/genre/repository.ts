import { PrismaService } from "../../prisma";
import { EntityWithStatic } from "@/domain/core/entities/base";
import { ID } from "@/domain/core/entities/id";
import { WithID } from "@/domain/core/entities/types";
import { Injectable } from "@nestjs/common";
import { createID } from "@tests/utils/domain";
import { RepeatedResource } from "@/domain/core/adapters/repository/errors/repeated-resource";
import { ResourceNotFoundError } from "@/domain/core/adapters/repository/errors/resource-not-found";
import { PrismaGenreMapper } from "./mapper";
import { GenreRepository } from "@/domain/bounded-contexts/movie-app/application/repositories/genre";
import { Genre, GenreProps } from "@/domain/bounded-contexts/movie-app/enterprise/entities/genre";


@Injectable()
export class PrismaGenreRepository implements GenreRepository {
  protected entity = Genre as unknown as EntityWithStatic<Genre>
  protected defaultQueryValues = {}

  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async create(props: GenreProps): Promise<Genre> {
    const genre = await this.prismaService.genre.create({
      data: props,
    });
    return PrismaGenreMapper.toDomain(genre);
  }

  async save(entity: Genre): Promise<Genre> {
    const genre = await this.prismaService.genre.create({
      data: PrismaGenreMapper.toInfra(entity),
    });
    return PrismaGenreMapper.toDomain(genre);
  }

  async update(id: ID, newProps: Partial<GenreProps>): Promise<Genre> {
    const genre = await this.prismaService.genre.update({
      where: { id: id.toValue() },
      data: newProps,
    });
    return Genre.reference(id, genre);
  }

  async get(props: Partial<WithID<GenreProps>>): Promise<Genre> {
    const genres = await this.prismaService.genre.findMany({
      where: {
        ...this.defaultQueryValues,
        ...PrismaGenreMapper.toInfraPartial(props),
      },
    });

    if (genres.length > 1) {
      throw new RepeatedResource()
    } else if (genres.length === 0) {
      throw new ResourceNotFoundError(this.entity)
    }

    const genre = genres[0];
    
    return Genre.reference(createID(genre.id), genre)
  }

  async findUnique(props: Partial<WithID<GenreProps>>): Promise<Genre | null> {
    const genres = await this.prismaService.genre.findMany({
      where: {
        ...this.defaultQueryValues,
        ...PrismaGenreMapper.toInfraPartial(props),
      },
    });


    if (genres.length > 1) {
      throw new RepeatedResource()
    }

    const genre = genres.length === 1 ? genres[0] : null;

    return genre ? Genre.reference(createID(genre.id), genre) : null;
  }

  async findFirst(props: Partial<WithID<GenreProps>>): Promise<Genre | null> {
    const genre = await this.prismaService.genre.findFirst({
      where: {
        ...this.defaultQueryValues,
        ...PrismaGenreMapper.toInfraPartial(props),
      },
    });

    return genre ? Genre.reference(createID(genre.id), genre) : null;
  }

  async findMany(props: Partial<WithID<GenreProps>>): Promise<Genre[]> {
    const genres = await this.prismaService.genre.findMany({
      where: {
        ...this.defaultQueryValues,
        ...PrismaGenreMapper.toInfraPartial(props),
      },
    });

    return genres.map((genre) => Genre.reference(createID(genre.id), genre));
  }

  async reset(): Promise<void> {
    await this.prismaService.genre.deleteMany({});
  }
}
