import { IAsocAdmin } from 'app/entities/asoc-admin/asoc-admin.model';

export interface IDateAsociati {
  id: number;
  nume?: string | null;
  prenume?: string | null;
  telefon?: string | null;
  asocadmin4?: Pick<IAsocAdmin, 'id'> | null;
}

export type NewDateAsociati = Omit<IDateAsociati, 'id'> & { id: null };
