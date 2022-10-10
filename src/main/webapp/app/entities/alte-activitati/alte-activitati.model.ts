import { ISrl } from 'app/entities/srl/srl.model';

export interface IAlteActivitati {
  id: number;
  codCAEN?: string | null;
  denumirea?: string | null;
  srl2?: Pick<ISrl, 'id'> | null;
}

export type NewAlteActivitati = Omit<IAlteActivitati, 'id'> & { id: null };
