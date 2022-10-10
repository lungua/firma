import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';

export interface ISrl {
  id: number;
  nume1?: string | null;
  nume2?: string | null;
  nume3?: string | null;
  numeSocietate?: string | null;
  nuneFinal?: boolean | null;
  dataInregistrare?: dayjs.Dayjs | null;
  inregistratDe?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewSrl = Omit<ISrl, 'id'> & { id: null };
