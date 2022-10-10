import { ICapitalSocial, NewCapitalSocial } from './capital-social.model';

export const sampleWithRequiredData: ICapitalSocial = {
  id: 49854,
};

export const sampleWithPartialData: ICapitalSocial = {
  id: 62114,
};

export const sampleWithFullData: ICapitalSocial = {
  id: 19546,
  suma: 'Ville interfaces',
};

export const sampleWithNewData: NewCapitalSocial = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
