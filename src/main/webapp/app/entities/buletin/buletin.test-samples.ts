import dayjs from 'dayjs/esm';

import { IBuletin, NewBuletin } from './buletin.model';

export const sampleWithRequiredData: IBuletin = {
  id: 81000,
};

export const sampleWithPartialData: IBuletin = {
  id: 59626,
};

export const sampleWithFullData: IBuletin = {
  id: 523,
  tip: 'instruction Nebraska',
  serie: 'Outdoors Games',
  numar: 'Awesome Communications Fresh',
  cnp: 'XML Berkshire',
  tara: 'aggregate Maryland Square',
  judet: 'Sleek Kids GB',
  localitate: 'Analyst',
  cetatenie: 'generate Manat interface',
  data: dayjs('2022-10-05T04:30'),
  eliberatDe: 'open-source Dynamic Central',
};

export const sampleWithNewData: NewBuletin = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
