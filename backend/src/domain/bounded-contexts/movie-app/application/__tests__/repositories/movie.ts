import { EntityWithStatic } from '@/domain/core/entities/base'
import { InMemoryRepository } from '@tests/utils/in-memory-repository'

import { Movie } from '../../../enterprise/entities/movie'
import { MovieRepository } from '../../repositories/movie'
import { ID } from '@/domain/core/entities/id'

export class InMemoryMovieRepository
  extends InMemoryRepository<Movie>
  implements MovieRepository
{
  protected entity = Movie as unknown as EntityWithStatic<Movie>

  async getMovieWithRelations(movieId: ID): Promise<Movie> {
    return this.get({
      id: movieId,
    })
  }

  async findManyForListing(payload: Partial<{ name: string; genreId: ID; actorId: ID; directorId: ID }>): Promise<Movie[]> {
    const movies = await this.findMany({
      name: payload.name,
    })

    return movies.filter((movie) => {
      const matches = [true, true, true]

      if (payload.genreId) {
        matches[0] = movie.props.genres.getItems().some((genre) => genre.props.genreId.isEqual(payload.genreId))
      }
      
      if (payload.actorId) {
        matches[1] = movie.props.actors.getItems().some((actor) => actor.props.actorId.isEqual(payload.actorId))
      }
      
      if (payload.directorId) {
        matches[2] = movie.props.directors.getItems().some((director) => director.props.directorId.isEqual(payload.directorId))
      }

      return matches.every((match) => match)
    })
  }
}
