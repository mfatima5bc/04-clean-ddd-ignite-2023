import { InMemoryQuestionRepository } from 'test/in-memory-question-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('Get question by slug', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it('Should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      title: 'Example question',
      slug: Slug.create('example-question'),
      authorId: new UniqueEntityID(),
      content: 'This is a example question?',
    })

    inMemoryQuestionRepository.create(newQuestion)
    const { question } = await sut.execute({ slug: 'example-question' })

    expect(question.id).toBeTruthy()
    expect(question.slug.value).toEqual('example-question')
  })
})
