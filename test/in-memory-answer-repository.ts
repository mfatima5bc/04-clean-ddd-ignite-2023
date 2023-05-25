import { AnswerRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = []

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }
    return answer
  }

  async delete(answer: Answer): Promise<void> {
    const indexItem = this.items.findIndex((item) => item.id === Question.id)

    this.items.splice(indexItem, 1)
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }
}
