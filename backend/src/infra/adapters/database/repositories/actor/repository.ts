import { PrismaService } from "../../prisma";
import { EntityWithStatic } from "@/domain/core/entities/base";
import { ID } from "@/domain/core/entities/id";
import { WithID } from "@/domain/core/entities/types";
import { Injectable } from "@nestjs/common";
import { createID } from "@tests/utils/domain";
import { RepeatedResource } from "@/domain/core/adapters/repository/errors/repeated-resource";
import { ResourceNotFoundError } from "@/domain/core/adapters/repository/errors/resource-not-found";
import { PrismaActorMapper } from "./mapper";
import { ActorRepository } from "@/domain/bounded-contexts/movie-app/application/repositories/actor";
import { Actor, ActorProps } from "@/domain/bounded-contexts/movie-app/enterprise/entities/actor";


@Injectable()
export class PrismaActorRepository implements ActorRepository {
  protected entity = Actor as unknown as EntityWithStatic<Actor>
  protected defaultQueryValues = {}

  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async create(props: ActorProps): Promise<Actor> {
    const actor = await this.prismaService.actor.create({
      data: props,
    });
    return PrismaActorMapper.toDomain(actor);
  }

  async save(entity: Actor): Promise<Actor> {
    const actor = await this.prismaService.actor.create({
      data: PrismaActorMapper.toInfra(entity),
    });
    return PrismaActorMapper.toDomain(actor);
  }

  async update(id: ID, newProps: Partial<ActorProps>): Promise<Actor> {
    const actor = await this.prismaService.actor.update({
      where: { id: id.toValue() },
      data: newProps,
    });
    return Actor.reference(id, actor);
  }

  async get(props: Partial<WithID<ActorProps>>): Promise<Actor> {
    const actors = await this.prismaService.actor.findMany({
      where: {
        ...this.defaultQueryValues,
        ...PrismaActorMapper.toInfraPartial(props),
      },
    });

    if (actors.length > 1) {
      throw new RepeatedResource()
    } else if (actors.length === 0) {
      throw new ResourceNotFoundError(this.entity)
    }

    const actor = actors[0];
    
    return Actor.reference(createID(actor.id), actor)
  }

  async findUnique(props: Partial<WithID<ActorProps>>): Promise<Actor | null> {
    const actors = await this.prismaService.actor.findMany({
      where: {
        ...this.defaultQueryValues,
        ...PrismaActorMapper.toInfraPartial(props),
      },
    });


    if (actors.length > 1) {
      throw new RepeatedResource()
    }

    const actor = actors.length === 1 ? actors[0] : null;

    return actor ? Actor.reference(createID(actor.id), actor) : null;
  }

  async findFirst(props: Partial<WithID<ActorProps>>): Promise<Actor | null> {
    const actor = await this.prismaService.actor.findFirst({
      where: {
        ...this.defaultQueryValues,
        ...PrismaActorMapper.toInfraPartial(props),
      },
    });

    return actor ? Actor.reference(createID(actor.id), actor) : null;
  }

  async findMany(props: Partial<WithID<ActorProps>>): Promise<Actor[]> {
    const actors = await this.prismaService.actor.findMany({
      where: {
        ...this.defaultQueryValues,
        ...PrismaActorMapper.toInfraPartial(props),
      },
    });

    return actors.map((actor) => Actor.reference(createID(actor.id), actor));
  }

  async reset(): Promise<void> {
    await this.prismaService.actor.deleteMany({});
  }
}
