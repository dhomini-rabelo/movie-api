import { Movie, MovieProps } from "@/domain/bounded-contexts/movie-app/enterprise/entities/movie";
import { MovieActor } from "@/domain/bounded-contexts/movie-app/enterprise/entities/movie-actor";
import { MovieDirector } from "@/domain/bounded-contexts/movie-app/enterprise/entities/movie-director";
import { MovieGenre } from "@/domain/bounded-contexts/movie-app/enterprise/entities/movie-genre";
import { MovieActorWatchedList } from "@/domain/bounded-contexts/movie-app/enterprise/entities/watched-lists/movie-actor";
import { MovieDirectorWatchedList } from "@/domain/bounded-contexts/movie-app/enterprise/entities/watched-lists/movie-director";
import { MovieGenreWatchedList } from "@/domain/bounded-contexts/movie-app/enterprise/entities/watched-lists/movie-genre";
import { WithID } from "@/domain/core/entities/types";
import { removeKeysForUndefinedValues } from "@/infra/lib/utils";
import {
  Movie as PrismaMovie,
  MovieDirector as PrismaMovieDirector,
  MovieActor as PrismaMovieActor,
  MovieGenre as PrismaMovieGenre,
} from '@prisma/client';
import { createID } from "@tests/utils/domain";


type PrismaMovieWithRelatedData = PrismaMovie & {
  directors: PrismaMovieDirector[]
  actors: PrismaMovieActor[]
  genres: PrismaMovieGenre[]
}


export class PrismaMovieMapper {

  static toDomainWIthRelational(movie: PrismaMovieWithRelatedData): Movie {
    return Movie.reference(createID(movie.id), {
      name: movie.name,
      year: movie.year,
      poster: movie.poster,
      description: movie.description,
      totalMinutes: movie.totalMinutes,
      directors: new MovieDirectorWatchedList(
        movie.directors.map((director) => (
          MovieDirector.reference(createID(director.id), { 
            directorId: createID(director.directorId),
            movieId: createID(director.movieId),
          })
        ))
      ),
      actors: new MovieActorWatchedList(
        movie.actors.map((actor) => (
          MovieActor.reference(createID(actor.id), { 
            actorId: createID(actor.actorId),
            movieId: createID(actor.movieId),
          })
        ))
      ),
      genres: new MovieGenreWatchedList(
        movie.genres.map((genre) => (
          MovieGenre.reference(createID(genre.id), { 
            genreId: createID(genre.genreId),
            movieId: createID(genre.movieId),
          })
        ))
      ),
    });
  }

  static toDomainProps(movie: PrismaMovie): MovieProps {
    return {
      name: movie.name,
      year: movie.year,
      poster: movie.poster,
      description: movie.description,
      totalMinutes: movie.totalMinutes,
      directors: new MovieDirectorWatchedList(),
      actors: new MovieActorWatchedList(),
      genres: new MovieGenreWatchedList(),
    }
  }

  static toDomain(movie: PrismaMovie): Movie {
    return Movie.reference(createID(movie.id), {
      name: movie.name,
      year: movie.year,
      poster: movie.poster,
      description: movie.description,
      totalMinutes: movie.totalMinutes,
      directors: new MovieDirectorWatchedList(),
      actors: new MovieActorWatchedList(),
      genres: new MovieGenreWatchedList(),
    });
  }

  static toInfra(movie: Movie): PrismaMovie {
    return {
      id: movie.id.toValue(),
      name: movie.props.name,
      year: movie.props.year,
      poster: movie.props.poster,
      description: movie.props.description,
      totalMinutes: movie.props.totalMinutes,
    };
  }

  static toInfraPartial(data: Partial<WithID<MovieProps>>) {
    return removeKeysForUndefinedValues({
      id: data.id?.toValue(),
      name: data.name,
    });
  }
}
