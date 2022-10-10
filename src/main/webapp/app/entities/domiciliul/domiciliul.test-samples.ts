import { IDomiciliul, NewDomiciliul } from './domiciliul.model';

export const sampleWithRequiredData: IDomiciliul = {
  id: 92443,
};

export const sampleWithPartialData: IDomiciliul = {
  id: 45385,
};

export const sampleWithFullData: IDomiciliul = {
  id: 32326,
  adresaCI: 'Iowa Forges',
};

export const sampleWithNewData: NewDomiciliul = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
