import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../dovada.test-samples';

import { DovadaFormService } from './dovada-form.service';

describe('Dovada Form Service', () => {
  let service: DovadaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DovadaFormService);
  });

  describe('Service methods', () => {
    describe('createDovadaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDovadaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            comodatInchiriere: expect.any(Object),
            durata: expect.any(Object),
            valoareInchiriere: expect.any(Object),
            valoareGarantie: expect.any(Object),
            moneda: expect.any(Object),
            sediu2: expect.any(Object),
          })
        );
      });

      it('passing IDovada should create a new form with FormGroup', () => {
        const formGroup = service.createDovadaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            comodatInchiriere: expect.any(Object),
            durata: expect.any(Object),
            valoareInchiriere: expect.any(Object),
            valoareGarantie: expect.any(Object),
            moneda: expect.any(Object),
            sediu2: expect.any(Object),
          })
        );
      });
    });

    describe('getDovada', () => {
      it('should return NewDovada for default Dovada initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDovadaFormGroup(sampleWithNewData);

        const dovada = service.getDovada(formGroup) as any;

        expect(dovada).toMatchObject(sampleWithNewData);
      });

      it('should return NewDovada for empty Dovada initial value', () => {
        const formGroup = service.createDovadaFormGroup();

        const dovada = service.getDovada(formGroup) as any;

        expect(dovada).toMatchObject({});
      });

      it('should return IDovada', () => {
        const formGroup = service.createDovadaFormGroup(sampleWithRequiredData);

        const dovada = service.getDovada(formGroup) as any;

        expect(dovada).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDovada should not enable id FormControl', () => {
        const formGroup = service.createDovadaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDovada should disable id FormControl', () => {
        const formGroup = service.createDovadaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
