import { IActivitatiPrincipale, NewActivitatiPrincipale } from './activitati-principale.model';

export const sampleWithRequiredData: IActivitatiPrincipale = {
  id: 42881,
};

export const sampleWithPartialData: IActivitatiPrincipale = {
  id: 58956,
};

export const sampleWithFullData: IActivitatiPrincipale = {
  id: 64344,
  codCAEN: 'Dynamic enterprise Pound',
  denumirea: 'compressing',
};

export const sampleWithNewData: NewActivitatiPrincipale = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
