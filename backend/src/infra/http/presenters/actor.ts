import { Actor } from "@/domain/bounded-contexts/movie-app/enterprise/entities/actor";

export class ActorPresenter {
  static toHttp(actor: Actor) {
    return {
      id: actor.id.toValue(),
      name: actor.props.name,
      avatarURL: actor.props.avatarURL,
    };
  }
}