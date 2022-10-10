import { IAsocAdmin } from 'app/entities/asoc-admin/asoc-admin.model';

export interface IDateSocietate {
  id: number;
  denumire?: string | null;
  cui?: string | null;
  regComert?: string | null;
  adresaSediu?: string | null;
  asocadmin2?: Pick<IAsocAdmin, 'id'> | null;
}

export type NewDateSocietate = Omit<IDateSocietate, 'id'> & { id: null };
