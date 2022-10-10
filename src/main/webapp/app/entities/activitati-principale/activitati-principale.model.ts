import { ISrl } from 'app/entities/srl/srl.model';
import { ISediul } from 'app/entities/sediul/sediul.model';

export interface IActivitatiPrincipale {
  id: number;
  codCAEN?: string | null;
  denumirea?: string | null;
  srl3?: Pick<ISrl, 'id'> | null;
  sediulxes?: Pick<ISediul, 'id'>[] | null;
}

export type NewActivitatiPrincipale = Omit<IActivitatiPrincipale, 'id'> & { id: null };
