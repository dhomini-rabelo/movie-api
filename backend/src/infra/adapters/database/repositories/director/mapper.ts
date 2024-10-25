import { Director, DirectorProps } from "@/domain/bounded-contexts/movie-app/enterprise/entities/director";
import { WithID } from "@/domain/core/entities/types";
import { removeKeysForUndefinedValues } from "@/infra/lib/utils";
import { Director as PrismaDirector } from '@prisma/client';
import { createID } from "@tests/utils/domain";

export class PrismaDirectorMapper {
  static toDomain(director: PrismaDirector): Director {
    return Director.reference(createID(director.id), {
      name: director.name,
      avatarURL: director.avatarURL,
    });
  }

  static toInfra(director: Director): PrismaDirector {
    return {
      id: director.id.toValue(),
      name: director.props.name,
      avatarURL: director.props.avatarURL,
    };
  }

  static toInfraPartial(data: Partial<WithID<DirectorProps>>) {
    return removeKeysForUndefinedValues({
      id: data.id?.toValue(),
      name: data.name,
      avatarURL: data.avatarURL,
    });
  }
}