import { CompanyStatus } from 'domain/common/company-status.enum';
import { IBaseEntity } from './base-entity.interface';

export interface ICompanyKey {
  id: string;
}

export interface ITier {
  tier: string;
  pricePerConversarion: number;
  conversationsLimit: number;
}

export interface ICompany extends ICompanyKey, IBaseEntity {
  name: string;
  monthlyFee: number;
  status: CompanyStatus;
  tiers: Array<ITier>;
}
