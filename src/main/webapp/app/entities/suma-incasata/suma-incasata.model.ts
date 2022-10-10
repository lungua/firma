import dayjs from 'dayjs/esm';
import { ISrl } from 'app/entities/srl/srl.model';

export interface ISumaIncasata {
  id: number;
  sumaIncasata?: number | null;
  dataIncasarii?: dayjs.Dayjs | null;
  srl5?: Pick<ISrl, 'id'> | null;
}

export type NewSumaIncasata = Omit<ISumaIncasata, 'id'> & { id: null };
