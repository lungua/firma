import { IActivitatiSecundare, NewActivitatiSecundare } from './activitati-secundare.model';

export const sampleWithRequiredData: IActivitatiSecundare = {
  id: 25187,
};

export const sampleWithPartialData: IActivitatiSecundare = {
  id: 87796,
  codCAEN: 'Dominica Concrete Plastic',
};

export const sampleWithFullData: IActivitatiSecundare = {
  id: 60026,
  codCAEN: 'violet Research Handmade',
  denumirea: 'Forward Director Peso',
};

export const sampleWithNewData: NewActivitatiSecundare = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
