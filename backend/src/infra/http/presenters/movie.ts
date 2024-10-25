import { Movie } from "@/domain/bounded-contexts/movie-app/enterprise/entities/movie";

export class MoviePresenter {
  static toHttp(movie: Movie) {
    return {
      id: movie.id.toValue(),
      name: movie.props.name,
      directors: movie.props.directors.getItems().map((director) => ({
        id: director.id.toValue(),
        directorId: director.props.directorId.toValue(),
      })),
      actors: movie.props.actors.getItems().map((actor) => ({
        id: actor.id.toValue(),
        actorId: actor.props.actorId.toValue(),
      })),
      genres: movie.props.genres.getItems().map((genre) => ({
        id: genre.id.toValue(),
        genreId: genre.props.genreId.toValue(),
      })),
    };
  }

  

  static toHttpSimpleData(movie: Movie) {
    return {
      id: movie.id.toValue(),
      name: movie.props.name,
    };
  }
}