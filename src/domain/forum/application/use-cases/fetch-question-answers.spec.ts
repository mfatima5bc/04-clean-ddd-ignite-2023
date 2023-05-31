import { FetchQuestionAnswersAnswersUseCase } from './fetch-question-answers'
import { InMemoryAnswerRepository } from 'test/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionAnswersRepository: InMemoryAnswerRepository
let sut: FetchQuestionAnswersAnswersUseCase

describe('Fetch question answers', () => {
  beforeEach(() => {
    inMemoryQuestionAnswersRepository = new InMemoryAnswerRepository()
    sut = new FetchQuestionAnswersAnswersUseCase(
      inMemoryQuestionAnswersRepository,
    )
  })

  it('should be able to fetch questions answers', async () => {
    await inMemoryQuestionAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    )
    await inMemoryQuestionAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    )
    await inMemoryQuestionAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    )

    const { answers } = await sut.execute({ questionId: 'question-1', page: 1 })

    expect(answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionAnswersRepository.create(
        makeAnswer({ questionId: new UniqueEntityID('question-1') }),
      )
    }

    const { answers } = await sut.execute({ questionId: 'question-1', page: 2 })

    expect(answers).toHaveLength(2)
  })
})
