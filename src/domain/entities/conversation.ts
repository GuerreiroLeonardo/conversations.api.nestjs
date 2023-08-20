import { IConversation } from 'domain/interfaces/conversation.interface';
import { BaseEntity } from './base-entity';

export class Conversation extends BaseEntity implements IConversation {
  phoneNumber: string;
  company: string;
  flowName: string;
  billingMonth: string;
  billingYear: string;
  constructor(init: Partial<Conversation>) {
    super();
    Object.assign(this, init);
  }
}
