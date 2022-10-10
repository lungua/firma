import dayjs from 'dayjs/esm';

export interface ISrl {
  id: number;
  nume1?: string | null;
  nume2?: string | null;
  nume3?: string | null;
  numeSocietate?: string | null;
  nuneFinal?: boolean | null;
  dataInregistrare?: dayjs.Dayjs | null;
  telefon?: string | null;
  email?: string | null;
  srlFinalizat?: boolean | null;
  logatCu?: string | null;
}

export type NewSrl = Omit<ISrl, 'id'> & { id: null };
