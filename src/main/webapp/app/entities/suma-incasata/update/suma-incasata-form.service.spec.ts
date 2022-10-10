import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../suma-incasata.test-samples';

import { SumaIncasataFormService } from './suma-incasata-form.service';

describe('SumaIncasata Form Service', () => {
  let service: SumaIncasataFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SumaIncasataFormService);
  });

  describe('Service methods', () => {
    describe('createSumaIncasataFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSumaIncasataFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sumaIncasata: expect.any(Object),
            dataIncasarii: expect.any(Object),
            srl5: expect.any(Object),
          })
        );
      });

      it('passing ISumaIncasata should create a new form with FormGroup', () => {
        const formGroup = service.createSumaIncasataFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sumaIncasata: expect.any(Object),
            dataIncasarii: expect.any(Object),
            srl5: expect.any(Object),
          })
        );
      });
    });

    describe('getSumaIncasata', () => {
      it('should return NewSumaIncasata for default SumaIncasata initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSumaIncasataFormGroup(sampleWithNewData);

        const sumaIncasata = service.getSumaIncasata(formGroup) as any;

        expect(sumaIncasata).toMatchObject(sampleWithNewData);
      });

      it('should return NewSumaIncasata for empty SumaIncasata initial value', () => {
        const formGroup = service.createSumaIncasataFormGroup();

        const sumaIncasata = service.getSumaIncasata(formGroup) as any;

        expect(sumaIncasata).toMatchObject({});
      });

      it('should return ISumaIncasata', () => {
        const formGroup = service.createSumaIncasataFormGroup(sampleWithRequiredData);

        const sumaIncasata = service.getSumaIncasata(formGroup) as any;

        expect(sumaIncasata).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISumaIncasata should not enable id FormControl', () => {
        const formGroup = service.createSumaIncasataFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSumaIncasata should disable id FormControl', () => {
        const formGroup = service.createSumaIncasataFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
