import { Actor, ActorProps } from "@/domain/bounded-contexts/movie-app/enterprise/entities/actor";
import { WithID } from "@/domain/core/entities/types";
import { removeKeysForUndefinedValues } from "@/infra/lib/utils";
import { Actor as PrismaActor } from '@prisma/client';
import { createID } from "@tests/utils/domain";

export class PrismaActorMapper {
  static toDomain(actor: PrismaActor): Actor {
    return Actor.reference(createID(actor.id), {
      name: actor.name,
      avatarURL: actor.avatarURL,
    });
  }

  static toInfra(actor: Actor): PrismaActor {
    return {
      id: actor.id.toValue(),
      name: actor.props.name,
      avatarURL: actor.props.avatarURL,
    };
  }

  static toInfraPartial(data: Partial<WithID<ActorProps>>) {
    return removeKeysForUndefinedValues({
      id: data.id?.toValue(),
      name: data.name,
      avatarURL: data.avatarURL,
    });
  }
}