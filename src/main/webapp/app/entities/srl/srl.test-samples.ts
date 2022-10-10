import dayjs from 'dayjs/esm';

import { ISrl, NewSrl } from './srl.model';

export const sampleWithRequiredData: ISrl = {
  id: 6917,
};

export const sampleWithPartialData: ISrl = {
  id: 23590,
  nume1: 'silver monitor',
  nume3: 'Auto',
  nuneFinal: true,
  dataInregistrare: dayjs('2022-10-05T09:24'),
};

export const sampleWithFullData: ISrl = {
  id: 23588,
  nume1: 'transmitter application',
  nume2: 'Virginia state synergies',
  nume3: 'Administrator',
  numeSocietate: 'Regional',
  nuneFinal: true,
  dataInregistrare: dayjs('2022-10-04T15:22'),
};

export const sampleWithNewData: NewSrl = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
