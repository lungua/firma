import { Moneda } from 'app/entities/enumerations/moneda.model';

import { IDovada, NewDovada } from './dovada.model';

export const sampleWithRequiredData: IDovada = {
  id: 71066,
};

export const sampleWithPartialData: IDovada = {
  id: 87350,
  comodatInchiriere: false,
  durata: 53121,
  moneda: Moneda['USD'],
};

export const sampleWithFullData: IDovada = {
  id: 41312,
  comodatInchiriere: false,
  durata: 93459,
  valoareInchiriere: 58395,
  valoareGarantie: 63825,
  moneda: Moneda['RON'],
};

export const sampleWithNewData: NewDovada = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
