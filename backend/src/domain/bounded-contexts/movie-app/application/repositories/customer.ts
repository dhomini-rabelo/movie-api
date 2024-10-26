import { UserRepository } from '@/domain/bounded-contexts/auth/application/repositories/user'
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class CustomerRepository extends UserRepository {}
