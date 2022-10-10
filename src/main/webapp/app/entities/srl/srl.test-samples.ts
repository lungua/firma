import dayjs from 'dayjs/esm';

import { ISrl, NewSrl } from './srl.model';

export const sampleWithRequiredData: ISrl = {
  id: 6917,
};

export const sampleWithPartialData: ISrl = {
  id: 39662,
  nume1: 'matrix Auto back-end',
  nume3: 'transmitter application',
  nuneFinal: true,
  dataInregistrare: dayjs('2022-10-09T21:11'),
  email: 'Lowell_Schoen43@hotmail.com',
  logatCu: 'Brand',
};

export const sampleWithFullData: ISrl = {
  id: 42341,
  nume1: 'Salad wireless',
  nume2: 'sexy well-modulated sensor',
  nume3: 'Sausages platforms cyan',
  numeSocietate: 'Identity gold multi-byte',
  nuneFinal: true,
  dataInregistrare: dayjs('2022-10-09T12:40'),
  telefon: 'PNG Cotton',
  email: 'Kaley_Stokes89@hotmail.com',
  srlFinalizat: false,
  logatCu: 'programming online 24/7',
};

export const sampleWithNewData: NewSrl = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
