import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../activitati-secundare.test-samples';

import { ActivitatiSecundareFormService } from './activitati-secundare-form.service';

describe('ActivitatiSecundare Form Service', () => {
  let service: ActivitatiSecundareFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitatiSecundareFormService);
  });

  describe('Service methods', () => {
    describe('createActivitatiSecundareFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createActivitatiSecundareFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codCAEN: expect.any(Object),
            denumirea: expect.any(Object),
            srl5: expect.any(Object),
            sediulies: expect.any(Object),
          })
        );
      });

      it('passing IActivitatiSecundare should create a new form with FormGroup', () => {
        const formGroup = service.createActivitatiSecundareFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codCAEN: expect.any(Object),
            denumirea: expect.any(Object),
            srl5: expect.any(Object),
            sediulies: expect.any(Object),
          })
        );
      });
    });

    describe('getActivitatiSecundare', () => {
      it('should return NewActivitatiSecundare for default ActivitatiSecundare initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createActivitatiSecundareFormGroup(sampleWithNewData);

        const activitatiSecundare = service.getActivitatiSecundare(formGroup) as any;

        expect(activitatiSecundare).toMatchObject(sampleWithNewData);
      });

      it('should return NewActivitatiSecundare for empty ActivitatiSecundare initial value', () => {
        const formGroup = service.createActivitatiSecundareFormGroup();

        const activitatiSecundare = service.getActivitatiSecundare(formGroup) as any;

        expect(activitatiSecundare).toMatchObject({});
      });

      it('should return IActivitatiSecundare', () => {
        const formGroup = service.createActivitatiSecundareFormGroup(sampleWithRequiredData);

        const activitatiSecundare = service.getActivitatiSecundare(formGroup) as any;

        expect(activitatiSecundare).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IActivitatiSecundare should not enable id FormControl', () => {
        const formGroup = service.createActivitatiSecundareFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewActivitatiSecundare should disable id FormControl', () => {
        const formGroup = service.createActivitatiSecundareFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
