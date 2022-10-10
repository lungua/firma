import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../asoc-admin.test-samples';

import { AsocAdminFormService } from './asoc-admin-form.service';

describe('AsocAdmin Form Service', () => {
  let service: AsocAdminFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsocAdminFormService);
  });

  describe('Service methods', () => {
    describe('createAsocAdminFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAsocAdminFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            persoanaFizica: expect.any(Object),
            asociat: expect.any(Object),
            srl: expect.any(Object),
          })
        );
      });

      it('passing IAsocAdmin should create a new form with FormGroup', () => {
        const formGroup = service.createAsocAdminFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            persoanaFizica: expect.any(Object),
            asociat: expect.any(Object),
            srl: expect.any(Object),
          })
        );
      });
    });

    describe('getAsocAdmin', () => {
      it('should return NewAsocAdmin for default AsocAdmin initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAsocAdminFormGroup(sampleWithNewData);

        const asocAdmin = service.getAsocAdmin(formGroup) as any;

        expect(asocAdmin).toMatchObject(sampleWithNewData);
      });

      it('should return NewAsocAdmin for empty AsocAdmin initial value', () => {
        const formGroup = service.createAsocAdminFormGroup();

        const asocAdmin = service.getAsocAdmin(formGroup) as any;

        expect(asocAdmin).toMatchObject({});
      });

      it('should return IAsocAdmin', () => {
        const formGroup = service.createAsocAdminFormGroup(sampleWithRequiredData);

        const asocAdmin = service.getAsocAdmin(formGroup) as any;

        expect(asocAdmin).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAsocAdmin should not enable id FormControl', () => {
        const formGroup = service.createAsocAdminFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAsocAdmin should disable id FormControl', () => {
        const formGroup = service.createAsocAdminFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
