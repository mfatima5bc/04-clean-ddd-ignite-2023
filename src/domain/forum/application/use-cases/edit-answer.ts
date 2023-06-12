import { ResponseType, error, success } from '@/core/response-type'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answers-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseResponse = ResponseType<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return error(new ResourceNotFoundError())
    }

    if (answer.authorId.toString() !== authorId) {
      return error(new NotAllowedError())
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return success({
      answer,
    })
  }
}
