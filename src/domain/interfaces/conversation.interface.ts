import { IBaseEntity } from './base-entity.interface';

export interface IConversationKey {
  id: string;
}

export interface IConversation extends IConversationKey, IBaseEntity {
  phoneNumber: string;
  company: string;
  flowName: string;
  billingMonth: string;
  billingYear: string;
}
