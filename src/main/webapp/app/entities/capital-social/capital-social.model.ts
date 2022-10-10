import { ISrl } from 'app/entities/srl/srl.model';

export interface ICapitalSocial {
  id: number;
  suma?: string | null;
  srl1?: Pick<ISrl, 'id'> | null;
}

export type NewCapitalSocial = Omit<ICapitalSocial, 'id'> & { id: null };
