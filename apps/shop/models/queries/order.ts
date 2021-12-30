import PageQuery from '../abstractions/page-query';
import { ValidationRule } from './validation-rule';

export interface Order {
  id: string;
  userGuid: string;
  walletAddress: string;
  network: string;
  amount: number;
  coin: any; // TODO: create class
  status: any; // TODO: create enum
  validationRule: ValidationRule;
  validations: any[]; // TODO: create class
}

export interface OrderQuery extends PageQuery  {
  status?: string[];
}
