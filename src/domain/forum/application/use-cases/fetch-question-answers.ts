import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answers-repository'

interface FetchQuestionAnswersAnswersUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionAnswersAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionAnswersAnswersUseCase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersAnswersUseCaseRequest): Promise<FetchQuestionAnswersAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return {
      answers,
    }
  }
}
