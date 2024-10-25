import { Genre } from "@/domain/bounded-contexts/movie-app/enterprise/entities/genre";

export class GenrePresenter {
  static toHttp(genre: Genre) {
    return {
      id: genre.id.toValue(),
      name: genre.props.name,
    };
  }
}