import { ISediul } from 'app/entities/sediul/sediul.model';
import { FizicJuridic } from 'app/entities/enumerations/fizic-juridic.model';

export interface IProprietari {
  id: number;
  fizicJuridic?: FizicJuridic | null;
  nume?: string | null;
  prenume?: string | null;
  tip?: string | null;
  serie?: string | null;
  numar?: string | null;
  cui?: string | null;
  denumireSocietate?: string | null;
  sediu3?: Pick<ISediul, 'id'> | null;
}

export type NewProprietari = Omit<IProprietari, 'id'> & { id: null };
