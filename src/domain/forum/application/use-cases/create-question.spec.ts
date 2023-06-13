import { InMemoryQuestionRepository } from 'test/in-memory-question-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('Create question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  it(' should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'Learn english',
      content: 'use duolingo',
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question)
  })
})
