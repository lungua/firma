import { IAdresa, NewAdresa } from './adresa.model';

export const sampleWithRequiredData: IAdresa = {
  id: 4103,
};

export const sampleWithPartialData: IAdresa = {
  id: 38804,
  strada: 'Car',
  numarul: 'circuit',
  localitatea: 'Frozen bypassing',
  judetul: 'Liaison',
  bloc: 'radical Analyst info-mediaries',
  scara: 'project',
  etaj: 'portals Rustic',
  alteDetalii: 'azure haptic Union',
};

export const sampleWithFullData: IAdresa = {
  id: 22413,
  strada: 'coherent Licensed Designer',
  numarul: 'Licensed capability card',
  localitatea: 'content Colombia Montana',
  judetul: 'Gorgeous',
  bloc: 'bypassing port SDD',
  scara: 'Rubber web-enabled protocol',
  etaj: 'Future',
  apartament: 'Mouse Savings',
  alteDetalii: 'withdrawal aggregate',
  asociatieLocatari: false,
};

export const sampleWithNewData: NewAdresa = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
