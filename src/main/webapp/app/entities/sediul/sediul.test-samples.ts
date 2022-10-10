import { ISediul, NewSediul } from './sediul.model';

export const sampleWithRequiredData: ISediul = {
  id: 50785,
};

export const sampleWithPartialData: ISediul = {
  id: 53548,
};

export const sampleWithFullData: ISediul = {
  id: 85700,
  sediusocialPunctLucru: false,
};

export const sampleWithNewData: NewSediul = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
