import { Director } from "@/domain/bounded-contexts/movie-app/enterprise/entities/director";

export class DirectorPresenter {
  static toHttp(director: Director) {
    return {
      id: director.id.toValue(),
      name: director.props.name,
      avatarURL: director.props.avatarURL,
    };
  }
}