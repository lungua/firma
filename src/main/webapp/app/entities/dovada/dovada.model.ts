import { ISediul } from 'app/entities/sediul/sediul.model';
import { Moneda } from 'app/entities/enumerations/moneda.model';

export interface IDovada {
  id: number;
  comodatInchiriere?: boolean | null;
  durata?: number | null;
  valoareInchiriere?: number | null;
  valoareGarantie?: number | null;
  moneda?: Moneda | null;
  sediu2?: Pick<ISediul, 'id'> | null;
}

export type NewDovada = Omit<IDovada, 'id'> & { id: null };
