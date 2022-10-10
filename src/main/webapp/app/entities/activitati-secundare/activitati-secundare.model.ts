import { ISrl } from 'app/entities/srl/srl.model';
import { ISediul } from 'app/entities/sediul/sediul.model';

export interface IActivitatiSecundare {
  id: number;
  codCAEN?: string | null;
  denumirea?: string | null;
  srl5?: Pick<ISrl, 'id'> | null;
  sediulies?: Pick<ISediul, 'id'>[] | null;
}

export type NewActivitatiSecundare = Omit<IActivitatiSecundare, 'id'> & { id: null };
