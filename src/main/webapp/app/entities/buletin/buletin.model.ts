import dayjs from 'dayjs/esm';
import { IAsocAdmin } from 'app/entities/asoc-admin/asoc-admin.model';

export interface IBuletin {
  id: number;
  tip?: string | null;
  serie?: string | null;
  numar?: string | null;
  cnp?: string | null;
  tara?: string | null;
  judet?: string | null;
  localitate?: string | null;
  cetatenie?: string | null;
  data?: dayjs.Dayjs | null;
  eliberatDe?: string | null;
  asocadmin1?: Pick<IAsocAdmin, 'id'> | null;
}

export type NewBuletin = Omit<IBuletin, 'id'> & { id: null };
