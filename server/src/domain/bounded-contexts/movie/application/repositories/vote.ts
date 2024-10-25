import { Repository } from '@/domain/core/adapters/repository'

import { Vote } from '../../enterprise/entities/vote'

export type VoteRepository = Repository<Vote>
