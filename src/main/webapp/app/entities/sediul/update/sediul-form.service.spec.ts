import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../sediul.test-samples';

import { SediulFormService } from './sediul-form.service';

describe('Sediul Form Service', () => {
  let service: SediulFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SediulFormService);
  });

  describe('Service methods', () => {
    describe('createSediulFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSediulFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sediusocialPunctLucru: expect.any(Object),
            actprinc1s: expect.any(Object),
            actprinc2s: expect.any(Object),
            srl4: expect.any(Object),
          })
        );
      });

      it('passing ISediul should create a new form with FormGroup', () => {
        const formGroup = service.createSediulFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sediusocialPunctLucru: expect.any(Object),
            actprinc1s: expect.any(Object),
            actprinc2s: expect.any(Object),
            srl4: expect.any(Object),
          })
        );
      });
    });

    describe('getSediul', () => {
      it('should return NewSediul for default Sediul initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSediulFormGroup(sampleWithNewData);

        const sediul = service.getSediul(formGroup) as any;

        expect(sediul).toMatchObject(sampleWithNewData);
      });

      it('should return NewSediul for empty Sediul initial value', () => {
        const formGroup = service.createSediulFormGroup();

        const sediul = service.getSediul(formGroup) as any;

        expect(sediul).toMatchObject({});
      });

      it('should return ISediul', () => {
        const formGroup = service.createSediulFormGroup(sampleWithRequiredData);

        const sediul = service.getSediul(formGroup) as any;

        expect(sediul).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISediul should not enable id FormControl', () => {
        const formGroup = service.createSediulFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSediul should disable id FormControl', () => {
        const formGroup = service.createSediulFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
