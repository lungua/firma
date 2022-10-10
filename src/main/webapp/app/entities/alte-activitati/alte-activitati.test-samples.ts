import { IAlteActivitati, NewAlteActivitati } from './alte-activitati.model';

export const sampleWithRequiredData: IAlteActivitati = {
  id: 6491,
};

export const sampleWithPartialData: IAlteActivitati = {
  id: 35603,
};

export const sampleWithFullData: IAlteActivitati = {
  id: 7516,
  codCAEN: 'bandwidth',
  denumirea: 'matrix',
};

export const sampleWithNewData: NewAlteActivitati = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
