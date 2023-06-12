import { ResponseType, error, success } from '@/core/response-type'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/questions-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type EditQuestionUseCaseResponse = ResponseType<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return error(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== authorId) {
      return error(new NotAllowedError())
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return success({
      question,
    })
  }
}
