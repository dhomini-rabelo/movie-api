import { Vote } from "@/domain/bounded-contexts/movie-app/enterprise/entities/vote";

export class VotePresenter {
  static toHttp(vote: Vote) {
    return {
      id: vote.id.toValue(),
      customerId: vote.props.customerId.toValue(),
      movieId: vote.props.movieId.toValue(),
      rating: vote.props.rating,
    };
  }
}