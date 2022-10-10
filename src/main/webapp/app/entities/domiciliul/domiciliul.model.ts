import { IAsocAdmin } from 'app/entities/asoc-admin/asoc-admin.model';

export interface IDomiciliul {
  id: number;
  adresaCI?: string | null;
  asocadmin3?: Pick<IAsocAdmin, 'id'> | null;
}

export type NewDomiciliul = Omit<IDomiciliul, 'id'> & { id: null };
