import { ISediul } from 'app/entities/sediul/sediul.model';

export interface IAdresa {
  id: number;
  strada?: string | null;
  numarul?: string | null;
  localitatea?: string | null;
  judetul?: string | null;
  bloc?: string | null;
  scara?: string | null;
  etaj?: string | null;
  apartament?: string | null;
  alteDetalii?: string | null;
  asociatieLocatari?: boolean | null;
  sediu1?: Pick<ISediul, 'id'> | null;
}

export type NewAdresa = Omit<IAdresa, 'id'> & { id: null };
