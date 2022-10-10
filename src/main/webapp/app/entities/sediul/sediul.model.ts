import { IActivitatiPrincipale } from 'app/entities/activitati-principale/activitati-principale.model';
import { IActivitatiSecundare } from 'app/entities/activitati-secundare/activitati-secundare.model';
import { ISrl } from 'app/entities/srl/srl.model';

export interface ISediul {
  id: number;
  sediusocialPunctLucru?: boolean | null;
  actprinc1s?: Pick<IActivitatiPrincipale, 'id'>[] | null;
  actprinc2s?: Pick<IActivitatiSecundare, 'id'>[] | null;
  srl4?: Pick<ISrl, 'id'> | null;
}

export type NewSediul = Omit<ISediul, 'id'> & { id: null };
