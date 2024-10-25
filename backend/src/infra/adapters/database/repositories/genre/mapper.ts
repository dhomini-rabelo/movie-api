import { Genre, GenreProps } from "@/domain/bounded-contexts/movie-app/enterprise/entities/genre";
import { WithID } from "@/domain/core/entities/types";
import { removeKeysForUndefinedValues } from "@/infra/lib/utils";
import { Genre as PrismaGenre } from '@prisma/client';
import { createID } from "@tests/utils/domain";

export class PrismaGenreMapper {
  static toDomain(genre: PrismaGenre): Genre {
    return Genre.reference(createID(genre.id), {
      name: genre.name,
    });
  }

  static toInfra(genre: Genre): PrismaGenre {
    return {
      id: genre.id.toValue(),
      name: genre.props.name,
    };
  }

  static toInfraPartial(data: Partial<WithID<GenreProps>>) {
    return removeKeysForUndefinedValues({
      id: data.id?.toValue(),
      name: data.name,
    });
  }
}