import { CustomerFactory } from '../../../__tests__/factories/customer'
import { createVoteData, VoteFactory } from '../../../__tests__/factories/vote'
import { InMemoryCustomerRepository } from '../../../__tests__/repositories/customer'
import { InMemoryVoteRepository } from '../../../__tests__/repositories/vote'
import { Vote } from '../../../../enterprise/entities/vote'
import { DuplicatedVoteError } from './errors/duplicated-vote'
import { InvalidRatingError } from './errors/invalid-rating'
import { VoteUseCase } from './vote'

describe('VoteUseCase', () => {
  const customerRepository = new InMemoryCustomerRepository()
  const voteRepository = new InMemoryVoteRepository()
  const customerFactory = new CustomerFactory(customerRepository)
  const voteFactory = new VoteFactory(voteRepository)
  const sut = new VoteUseCase(voteRepository)

  beforeEach(async () => {
    await customerRepository.reset()
    await voteRepository.reset()
  })

  it('should register a vote', async () => {
    const voteData = createVoteData()

    const response = await sut.execute({
      customerId: voteData.customerId.toString(),
      movieId: voteData.movieId.toString(),
      rating: voteData.rating,
    })

    expect(response).instanceOf(Vote)
    expect(
      (await voteRepository.get({ id: response.id })).isEqual(response),
    ).toBeTruthy()
  })

  it('should throw DuplicatedVoteError if the customer has already voted for the movie', async () => {
    await expect(async () => {
      const customer = await customerFactory.create()
      const vote = await voteFactory.create({
        customerId: customer.id,
      })

      await sut.execute({
        customerId: vote.props.customerId.toString(),
        movieId: vote.props.movieId.toString(),
        rating: vote.props.rating,
      })
    }).rejects.toThrowError(DuplicatedVoteError)
  })

  it.each([
    { rating: 0 },
    { rating: 1 },
    { rating: 2 },
    { rating: 3 },
    { rating: 4 },
  ])(
    'should guarantee that the rating is between 0 and 4',
    async ({ rating }) => {
      const voteData = createVoteData()

      const response = await sut.execute({
        customerId: voteData.customerId.toString(),
        movieId: voteData.movieId.toString(),
        rating,
      })

      expect(response.props.rating).toBe(rating)
    },
  )

  it.each([{ rating: 5 }, { rating: -1 }])(
    'should throw InvalidRatingError if the rating is not between 0 and 4',
    async ({ rating }) => {
      await expect(async () => {
        const voteData = createVoteData()
        await sut.execute({
          customerId: voteData.customerId.toString(),
          movieId: voteData.movieId.toString(),
          rating,
        })
      }).rejects.toThrowError(InvalidRatingError)
    },
  )

  it('should throw InvalidRatingError for a float value', async () => {
    await expect(async () => {
      const voteData = createVoteData()
      await sut.execute({
        customerId: voteData.customerId.toString(),
        movieId: voteData.movieId.toString(),
        rating: 3.5,
      })
    }).rejects.toThrowError(InvalidRatingError)
  })
})
