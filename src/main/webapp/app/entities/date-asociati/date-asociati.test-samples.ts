import { IDateAsociati, NewDateAsociati } from './date-asociati.model';

export const sampleWithRequiredData: IDateAsociati = {
  id: 93377,
};

export const sampleWithPartialData: IDateAsociati = {
  id: 97017,
  nume: 'Massachusetts Customer Norway',
};

export const sampleWithFullData: IDateAsociati = {
  id: 92209,
  nume: 'Facilitator Motorway markets',
  prenume: 'Internal Car payment',
  telefon: 'Account virtual Refined',
};

export const sampleWithNewData: NewDateAsociati = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
