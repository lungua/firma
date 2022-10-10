import { ISrl } from 'app/entities/srl/srl.model';

export interface IAsocAdmin {
  id: number;
  persoanaFizica?: boolean | null;
  asociat?: boolean | null;
  srl?: Pick<ISrl, 'id'> | null;
}

export type NewAsocAdmin = Omit<IAsocAdmin, 'id'> & { id: null };
