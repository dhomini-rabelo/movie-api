import { User, UserProps } from "@/domain/bounded-contexts/auth/enterprise/entities/user";
import { WithID } from "@/domain/core/entities/types";
import { removeKeysForUndefinedValues } from "@/infra/lib/utils";
import { User as PrismaUser } from '@prisma/client';
import { createID } from "@tests/utils/domain";

export class PrismaUserMapper {
  static toDomain(user: PrismaUser): User {
    return User.reference(createID(user.id), {
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      isDeleted: user.isDeleted,
    });
  }

  static toInfra(user: User): PrismaUser {
    return {
      id: user.id.toValue(),
      email: user.props.email,
      password: user.props.password,
      isAdmin: user.props.isAdmin,
      isDeleted: user.props.isDeleted,
    };
  }

  static toInfraPartial(data: Partial<WithID<UserProps>>) {
    return removeKeysForUndefinedValues({
      id: data.id?.toValue(),
      email: data.email,
      password: data.password,
      isAdmin: data.isAdmin,
      isDeleted: data.isDeleted,
    });
  }
}