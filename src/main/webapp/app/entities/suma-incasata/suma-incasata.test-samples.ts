import dayjs from 'dayjs/esm';

import { ISumaIncasata, NewSumaIncasata } from './suma-incasata.model';

export const sampleWithRequiredData: ISumaIncasata = {
  id: 4416,
};

export const sampleWithPartialData: ISumaIncasata = {
  id: 53260,
};

export const sampleWithFullData: ISumaIncasata = {
  id: 16144,
  sumaIncasata: 32620,
  dataIncasarii: dayjs('2022-10-09'),
};

export const sampleWithNewData: NewSumaIncasata = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
