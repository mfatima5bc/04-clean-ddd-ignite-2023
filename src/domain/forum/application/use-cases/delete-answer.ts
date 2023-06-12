import { ResponseType, error, success } from '@/core/response-type'
import { AnswerRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerUseCaseResponse = ResponseType<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return error(new ResourceNotFoundError())
    }

    if (answer.authorId.toString() !== authorId) {
      return error(new NotAllowedError())
    }

    await this.answerRepository.delete(answer)

    return success({})
  }
}
