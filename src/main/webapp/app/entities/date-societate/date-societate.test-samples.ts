import { IDateSocietate, NewDateSocietate } from './date-societate.model';

export const sampleWithRequiredData: IDateSocietate = {
  id: 31465,
};

export const sampleWithPartialData: IDateSocietate = {
  id: 83475,
  cui: 'interface Auto International',
};

export const sampleWithFullData: IDateSocietate = {
  id: 87022,
  denumire: 'Director mobile',
  cui: 'Small',
  regComert: 'Market',
  adresaSediu: 'CFP Uganda',
};

export const sampleWithNewData: NewDateSocietate = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
