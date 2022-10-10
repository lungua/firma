import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../activitati-principale.test-samples';

import { ActivitatiPrincipaleFormService } from './activitati-principale-form.service';

describe('ActivitatiPrincipale Form Service', () => {
  let service: ActivitatiPrincipaleFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitatiPrincipaleFormService);
  });

  describe('Service methods', () => {
    describe('createActivitatiPrincipaleFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createActivitatiPrincipaleFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codCAEN: expect.any(Object),
            denumirea: expect.any(Object),
            srl3: expect.any(Object),
            sediulxes: expect.any(Object),
          })
        );
      });

      it('passing IActivitatiPrincipale should create a new form with FormGroup', () => {
        const formGroup = service.createActivitatiPrincipaleFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codCAEN: expect.any(Object),
            denumirea: expect.any(Object),
            srl3: expect.any(Object),
            sediulxes: expect.any(Object),
          })
        );
      });
    });

    describe('getActivitatiPrincipale', () => {
      it('should return NewActivitatiPrincipale for default ActivitatiPrincipale initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createActivitatiPrincipaleFormGroup(sampleWithNewData);

        const activitatiPrincipale = service.getActivitatiPrincipale(formGroup) as any;

        expect(activitatiPrincipale).toMatchObject(sampleWithNewData);
      });

      it('should return NewActivitatiPrincipale for empty ActivitatiPrincipale initial value', () => {
        const formGroup = service.createActivitatiPrincipaleFormGroup();

        const activitatiPrincipale = service.getActivitatiPrincipale(formGroup) as any;

        expect(activitatiPrincipale).toMatchObject({});
      });

      it('should return IActivitatiPrincipale', () => {
        const formGroup = service.createActivitatiPrincipaleFormGroup(sampleWithRequiredData);

        const activitatiPrincipale = service.getActivitatiPrincipale(formGroup) as any;

        expect(activitatiPrincipale).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IActivitatiPrincipale should not enable id FormControl', () => {
        const formGroup = service.createActivitatiPrincipaleFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewActivitatiPrincipale should disable id FormControl', () => {
        const formGroup = service.createActivitatiPrincipaleFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
