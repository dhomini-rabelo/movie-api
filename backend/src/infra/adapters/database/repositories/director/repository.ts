import { PrismaService } from "../../prisma";
import { EntityWithStatic } from "@/domain/core/entities/base";
import { ID } from "@/domain/core/entities/id";
import { WithID } from "@/domain/core/entities/types";
import { Injectable } from "@nestjs/common";
import { createID } from "@tests/utils/domain";
import { RepeatedResource } from "@/domain/core/adapters/repository/errors/repeated-resource";
import { ResourceNotFoundError } from "@/domain/core/adapters/repository/errors/resource-not-found";
import { PrismaDirectorMapper } from "./mapper";
import { DirectorRepository } from "@/domain/bounded-contexts/movie-app/application/repositories/director";
import { Director, DirectorProps } from "@/domain/bounded-contexts/movie-app/enterprise/entities/director";


@Injectable()
export class PrismaDirectorRepository implements DirectorRepository {
  protected entity = Director as unknown as EntityWithStatic<Director>
  protected defaultQueryValues = {}

  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async create(props: DirectorProps): Promise<Director> {
    const director = await this.prismaService.director.create({
      data: props,
    });
    return PrismaDirectorMapper.toDomain(director);
  }

  async save(entity: Director): Promise<Director> {
    const director = await this.prismaService.director.create({
      data: PrismaDirectorMapper.toInfra(entity),
    });
    return PrismaDirectorMapper.toDomain(director);
  }

  async update(id: ID, newProps: Partial<DirectorProps>): Promise<Director> {
    const director = await this.prismaService.director.update({
      where: { id: id.toValue() },
      data: newProps,
    });
    return Director.reference(id, director);
  }

  async get(props: Partial<WithID<DirectorProps>>): Promise<Director> {
    const directors = await this.prismaService.director.findMany({
      where: {
        ...this.defaultQueryValues,
        ...PrismaDirectorMapper.toInfraPartial(props),
      },
    });

    if (directors.length > 1) {
      throw new RepeatedResource()
    } else if (directors.length === 0) {
      throw new ResourceNotFoundError(this.entity)
    }

    const director = directors[0];
    
    return Director.reference(createID(director.id), director)
  }

  async findUnique(props: Partial<WithID<DirectorProps>>): Promise<Director | null> {
    const directors = await this.prismaService.director.findMany({
      where: {
        ...this.defaultQueryValues,
        ...PrismaDirectorMapper.toInfraPartial(props),
      },
    });


    if (directors.length > 1) {
      throw new RepeatedResource()
    }

    const director = directors.length === 1 ? directors[0] : null;

    return director ? Director.reference(createID(director.id), director) : null;
  }

  async findFirst(props: Partial<WithID<DirectorProps>>): Promise<Director | null> {
    const director = await this.prismaService.director.findFirst({
      where: {
        ...this.defaultQueryValues,
        ...PrismaDirectorMapper.toInfraPartial(props),
      },
    });

    return director ? Director.reference(createID(director.id), director) : null;
  }

  async findMany(props: Partial<WithID<DirectorProps>>): Promise<Director[]> {
    const directors = await this.prismaService.director.findMany({
      where: {
        ...this.defaultQueryValues,
        ...PrismaDirectorMapper.toInfraPartial(props),
      },
    });

    return directors.map((director) => Director.reference(createID(director.id), director));
  }

  async reset(): Promise<void> {
    await this.prismaService.director.deleteMany({});
  }
}
