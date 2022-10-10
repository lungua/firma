import { IAsocAdmin, NewAsocAdmin } from './asoc-admin.model';

export const sampleWithRequiredData: IAsocAdmin = {
  id: 20154,
};

export const sampleWithPartialData: IAsocAdmin = {
  id: 31470,
};

export const sampleWithFullData: IAsocAdmin = {
  id: 34834,
  persoanaFizica: false,
  asociat: true,
};

export const sampleWithNewData: NewAsocAdmin = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
