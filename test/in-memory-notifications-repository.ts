import { NotificationsRepository } from '@/domain/forum/application/repositories/notifications-repository'
import { Notification } from '@/domain/forum/enterprise/entities/notification'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[] = []

  async create(notification: Notification) {
    this.items.push(notification)
  }
}
