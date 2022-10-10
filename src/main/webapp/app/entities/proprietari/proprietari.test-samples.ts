import { FizicJuridic } from 'app/entities/enumerations/fizic-juridic.model';

import { IProprietari, NewProprietari } from './proprietari.model';

export const sampleWithRequiredData: IProprietari = {
  id: 82496,
};

export const sampleWithPartialData: IProprietari = {
  id: 46207,
  fizicJuridic: FizicJuridic['FIZIC'],
  prenume: 'transmitter Missouri',
  serie: 'Licensed Data',
  denumireSocietate: 'Small',
};

export const sampleWithFullData: IProprietari = {
  id: 64040,
  fizicJuridic: FizicJuridic['JURIDIC'],
  nume: 'Lead panel Engineer',
  prenume: 'Beauty',
  tip: 'Agent Kentucky',
  serie: 'RAM Stand-alone Cross-group',
  numar: 'clicks-and-mortar',
  cui: 'Expanded capacitor calculate',
  denumireSocietate: 'Garden virtual',
};

export const sampleWithNewData: NewProprietari = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
