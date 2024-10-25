import { UserRepository } from "@/domain/bounded-contexts/auth/application/repositories/user";
import { PrismaService } from "../../prisma";
import { UserProps, User } from "@/domain/bounded-contexts/auth/enterprise/entities/user";
import { Entity, EntityWithStatic } from "@/domain/core/entities/base";
import { ID } from "@/domain/core/entities/id";
import { WithID } from "@/domain/core/entities/types";
import { Injectable } from "@nestjs/common";
import { createID } from "@tests/utils/domain";
import { RepeatedResource } from "@/domain/core/adapters/repository/errors/repeated-resource";
import { ResourceNotFoundError } from "@/domain/core/adapters/repository/errors/resource-not-found";
import { PrismaUserMapper } from "./mapper";


@Injectable()
export class PrismaUserRepository implements UserRepository {
  protected entity = User as unknown as EntityWithStatic<User>

  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async create(props: UserProps): Promise<User> {
    const user = await this.prismaService.user.create({
      data: props,
    });
    return PrismaUserMapper.toDomain(user);
  }

  async save(entity: User): Promise<User> {
    const user = await this.prismaService.user.create({
      data: PrismaUserMapper.toInfra(entity),
    });
    return PrismaUserMapper.toDomain(user);
  }

  async update(id: ID, newProps: Partial<UserProps>): Promise<User> {
    const user = await this.prismaService.user.update({
      where: { id: id.toValue() },
      data: newProps,
    });
    return User.reference(id, user);
  }

  async get(props: Partial<WithID<UserProps>>): Promise<User> {
    const users = await this.prismaService.user.findMany({
      where: PrismaUserMapper.toInfraPartial(props),
    });

    if (users.length > 1) {
      throw new RepeatedResource()
    } else if (users.length === 0) {
      throw new ResourceNotFoundError(this.entity)
    }

    const user = users[0];
    
    return User.reference(createID(user.id), user)
  }

  async findUnique(props: Partial<WithID<UserProps>>): Promise<User | null> {
    const users = await this.prismaService.user.findMany({
      where: PrismaUserMapper.toInfraPartial(props),
    });


    if (users.length > 1) {
      throw new RepeatedResource()
    }

    const user = users.length === 1 ? users[0] : null;

    return user ? User.reference(createID(user.id), user) : null;
  }

  async findFirst(props: Partial<WithID<UserProps>>): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: PrismaUserMapper.toInfraPartial(props),
    });

    return user ? User.reference(createID(user.id), user) : null;
  }

  async findMany(props: Partial<WithID<UserProps>>): Promise<User[]> {
    const users = await this.prismaService.user.findMany({
      where: PrismaUserMapper.toInfraPartial(props),
    });

    return users.map((user) => User.reference(createID(user.id), user));
  }

  async reset(): Promise<void> {
    await this.prismaService.user.deleteMany({});
  }
}
