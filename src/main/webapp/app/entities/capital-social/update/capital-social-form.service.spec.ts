import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../capital-social.test-samples';

import { CapitalSocialFormService } from './capital-social-form.service';

describe('CapitalSocial Form Service', () => {
  let service: CapitalSocialFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapitalSocialFormService);
  });

  describe('Service methods', () => {
    describe('createCapitalSocialFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCapitalSocialFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            suma: expect.any(Object),
            srl1: expect.any(Object),
          })
        );
      });

      it('passing ICapitalSocial should create a new form with FormGroup', () => {
        const formGroup = service.createCapitalSocialFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            suma: expect.any(Object),
            srl1: expect.any(Object),
          })
        );
      });
    });

    describe('getCapitalSocial', () => {
      it('should return NewCapitalSocial for default CapitalSocial initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCapitalSocialFormGroup(sampleWithNewData);

        const capitalSocial = service.getCapitalSocial(formGroup) as any;

        expect(capitalSocial).toMatchObject(sampleWithNewData);
      });

      it('should return NewCapitalSocial for empty CapitalSocial initial value', () => {
        const formGroup = service.createCapitalSocialFormGroup();

        const capitalSocial = service.getCapitalSocial(formGroup) as any;

        expect(capitalSocial).toMatchObject({});
      });

      it('should return ICapitalSocial', () => {
        const formGroup = service.createCapitalSocialFormGroup(sampleWithRequiredData);

        const capitalSocial = service.getCapitalSocial(formGroup) as any;

        expect(capitalSocial).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICapitalSocial should not enable id FormControl', () => {
        const formGroup = service.createCapitalSocialFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCapitalSocial should disable id FormControl', () => {
        const formGroup = service.createCapitalSocialFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
