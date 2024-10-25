import { PrismaService } from "../../prisma";
import { EntityWithStatic } from "@/domain/core/entities/base";
import { ID } from "@/domain/core/entities/id";
import { WithID } from "@/domain/core/entities/types";
import { Injectable } from "@nestjs/common";
import { createID } from "@tests/utils/domain";
import { RepeatedResource } from "@/domain/core/adapters/repository/errors/repeated-resource";
import { ResourceNotFoundError } from "@/domain/core/adapters/repository/errors/resource-not-found";
import { PrismaMovieMapper } from "./mapper";
import { MovieRepository } from "@/domain/bounded-contexts/movie-app/application/repositories/movie";
import { Movie, MovieProps } from "@/domain/bounded-contexts/movie-app/enterprise/entities/movie";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";


@Injectable()
export class PrismaMovieRepository implements MovieRepository {
  protected entity = Movie as unknown as EntityWithStatic<Movie>
  protected defaultQueryValues = {}

  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async create(props: MovieProps): Promise<Movie> {
    return await this.prismaService.$transaction(async (client) => {
      const movie = await client.movie.create({
        data: this.getDBProps(props),
      });
  
      const directorsItems = props.directors.getItems();
      const actorsItems = props.actors.getItems();
      const genresItems = props.genres.getItems();

      await Promise.all([

        client.movieDirector.createMany({
          data: directorsItems.map((director) => ({
            directorId: director.props.directorId.toValue(),
            movieId: movie.id,
          })),
        }),

        client.movieActor.createMany({
          data: actorsItems.map((actor) => ({
            actorId: actor.props.actorId.toValue(),
            movieId: movie.id,
          })),
        }),

        client.movieGenre.createMany({
          data: genresItems.map((genre) => ({
            genreId: genre.props.genreId.toValue(),
            movieId: movie.id,
          })),
        }),

      ])

      const [directors, actors, genres] = await this.getManyToManyData(client, movie.id);

      return PrismaMovieMapper.toDomainWIthRelational({
        ...movie,
        directors,
        actors,
        genres,
      });
    });
  }

  async save(entity: Movie): Promise<Movie> {
    return await this.prismaService.$transaction(async (client) => {
      const movie = await client.movie.create({
        data: this.getDBProps(entity.props),
      });
  
      const directorsItems = entity.props.directors.getItems();
      const actorsItems = entity.props.actors.getItems();
      const genresItems = entity.props.genres.getItems();
  
      await Promise.all([

        client.movieDirector.createMany({
          data: directorsItems.map((director) => ({
            directorId: director.props.directorId.toValue(),
            movieId: movie.id,
          })),
        }),

        client.movieActor.createMany({
          data: actorsItems.map((actor) => ({
            actorId: actor.props.actorId.toValue(),
            movieId: movie.id,
          })),
        }),

        client.movieGenre.createMany({
          data: genresItems.map((genre) => ({
            genreId: genre.props.genreId.toValue(),
            movieId: movie.id,
          })),
        }),

      ])

      const [directors, actors, genres] = await this.getManyToManyData(client, movie.id);
  
      return PrismaMovieMapper.toDomainWIthRelational({
        ...movie,
        directors,
        actors,
        genres,
      });
    });

  }

  async update(id: ID, newProps: Partial<MovieProps>): Promise<Movie> {
    throw new Error("Method not implemented.");
  }

  async get(props: Partial<WithID<MovieProps>>): Promise<Movie> {
    const movies = await this.prismaService.movie.findMany({
      where: {
        ...this.defaultQueryValues,
        ...PrismaMovieMapper.toInfraPartial(props),
      },
    });

    if (movies.length > 1) {
      throw new RepeatedResource()
    } else if (movies.length === 0) {
      throw new ResourceNotFoundError(this.entity)
    }

    const movie = movies[0];
    
    return Movie.reference(
      createID(movie.id),
      PrismaMovieMapper.toDomainProps(movie),
    )
  }

  async getMovieWithRelations(movieId: ID): Promise<Movie> {
    const movie = await this.get({
      id: movieId,
    })

    const [directors, actors, genres] = await this.getManyToManyData(this.prismaService, movieId.toValue());

    return PrismaMovieMapper.toDomainWIthRelational({
      ...PrismaMovieMapper.toInfra(movie),
      directors,
      actors,
      genres,
    });
  }

  async findUnique(props: Partial<WithID<MovieProps>>): Promise<Movie | null> {
    const movies = await this.prismaService.movie.findMany({
      where: {
        ...this.defaultQueryValues,
        ...PrismaMovieMapper.toInfraPartial(props),
      },
    });


    if (movies.length > 1) {
      throw new RepeatedResource()
    }

    const movie = movies.length === 1 ? movies[0] : null;

    return movie ? Movie.reference(
      createID(movie.id),
      PrismaMovieMapper.toDomainProps(movie),
    ) : null;
  }

  async findFirst(props: Partial<WithID<MovieProps>>): Promise<Movie | null> {
    const movie = await this.prismaService.movie.findFirst({
      where: {
        ...this.defaultQueryValues,
        ...PrismaMovieMapper.toInfraPartial(props),
      },
    });

    return movie ? Movie.reference(
      createID(movie.id),
      PrismaMovieMapper.toDomainProps(movie),
    ) : null;
  }

  async findMany(props: Partial<WithID<MovieProps>>): Promise<Movie[]> {
    const movies = await this.prismaService.movie.findMany({
      where: {
        ...this.defaultQueryValues,
        ...PrismaMovieMapper.toInfraPartial(props),
      },
    });

    return movies.map((movie) => Movie.reference(
      createID(movie.id),
      PrismaMovieMapper.toDomainProps(movie),
    ));
  }

  async findManyForListing(payload: Partial<{ name: string; genreId: ID; actorId: ID; directorId: ID }>): Promise<Movie[]> {
    const movies = await this.prismaService.movie.findMany({
      where: {
        name: {
          contains: payload.name,
        },
        MovieGenre: {
          some: {
            genreId: payload.genreId?.toValue(),
          },
        },
        MovieActor: {
          some: {
            actorId: payload.actorId?.toValue(),
          },
        },
        MovieDirector: {
          some: {
            directorId: payload.directorId?.toValue(),
          },
        },
      },
      include: {
        MovieDirector: true,
        MovieActor: true,
        MovieGenre: true,
      }
    });

    return movies.map(PrismaMovieMapper.toDomain);
  }

  async reset(): Promise<void> {
    await this.prismaService.movie.deleteMany({});
  }

  private getDBProps(props: MovieProps) {
    return {
      name: props.name,
      year: props.year,
      poster: props.poster,
      description: props.description,
      totalMinutes: props.totalMinutes,
    };
  }

  private async getManyToManyData(
    client: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">,
    movieId: string
  ) {
    return await Promise.all([
      client.movieDirector.findMany({
        where: {
          movieId: movieId,
        },
      }),

      client.movieActor.findMany({
        where: {
          movieId: movieId,
        },
      }),

      client.movieGenre.findMany({
        where: {
          movieId: movieId,
        },
      }),
    ]);
  }
}
