import { User } from "@/domain/bounded-contexts/auth/enterprise/entities/user";

export class UserPresenter {
  static toDTO(user: User) {
    return {
      id: user.id.toValue(),
      email: user.props.email,
      isAdmin: user.props.isAdmin,
    };
  }
}