import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../alte-activitati.test-samples';

import { AlteActivitatiFormService } from './alte-activitati-form.service';

describe('AlteActivitati Form Service', () => {
  let service: AlteActivitatiFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlteActivitatiFormService);
  });

  describe('Service methods', () => {
    describe('createAlteActivitatiFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAlteActivitatiFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codCAEN: expect.any(Object),
            denumirea: expect.any(Object),
            srl2: expect.any(Object),
          })
        );
      });

      it('passing IAlteActivitati should create a new form with FormGroup', () => {
        const formGroup = service.createAlteActivitatiFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codCAEN: expect.any(Object),
            denumirea: expect.any(Object),
            srl2: expect.any(Object),
          })
        );
      });
    });

    describe('getAlteActivitati', () => {
      it('should return NewAlteActivitati for default AlteActivitati initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAlteActivitatiFormGroup(sampleWithNewData);

        const alteActivitati = service.getAlteActivitati(formGroup) as any;

        expect(alteActivitati).toMatchObject(sampleWithNewData);
      });

      it('should return NewAlteActivitati for empty AlteActivitati initial value', () => {
        const formGroup = service.createAlteActivitatiFormGroup();

        const alteActivitati = service.getAlteActivitati(formGroup) as any;

        expect(alteActivitati).toMatchObject({});
      });

      it('should return IAlteActivitati', () => {
        const formGroup = service.createAlteActivitatiFormGroup(sampleWithRequiredData);

        const alteActivitati = service.getAlteActivitati(formGroup) as any;

        expect(alteActivitati).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAlteActivitati should not enable id FormControl', () => {
        const formGroup = service.createAlteActivitatiFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAlteActivitati should disable id FormControl', () => {
        const formGroup = service.createAlteActivitatiFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
