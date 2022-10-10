import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../date-societate.test-samples';

import { DateSocietateFormService } from './date-societate-form.service';

describe('DateSocietate Form Service', () => {
  let service: DateSocietateFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateSocietateFormService);
  });

  describe('Service methods', () => {
    describe('createDateSocietateFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDateSocietateFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            denumire: expect.any(Object),
            cui: expect.any(Object),
            regComert: expect.any(Object),
            adresaSediu: expect.any(Object),
            asocadmin2: expect.any(Object),
          })
        );
      });

      it('passing IDateSocietate should create a new form with FormGroup', () => {
        const formGroup = service.createDateSocietateFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            denumire: expect.any(Object),
            cui: expect.any(Object),
            regComert: expect.any(Object),
            adresaSediu: expect.any(Object),
            asocadmin2: expect.any(Object),
          })
        );
      });
    });

    describe('getDateSocietate', () => {
      it('should return NewDateSocietate for default DateSocietate initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDateSocietateFormGroup(sampleWithNewData);

        const dateSocietate = service.getDateSocietate(formGroup) as any;

        expect(dateSocietate).toMatchObject(sampleWithNewData);
      });

      it('should return NewDateSocietate for empty DateSocietate initial value', () => {
        const formGroup = service.createDateSocietateFormGroup();

        const dateSocietate = service.getDateSocietate(formGroup) as any;

        expect(dateSocietate).toMatchObject({});
      });

      it('should return IDateSocietate', () => {
        const formGroup = service.createDateSocietateFormGroup(sampleWithRequiredData);

        const dateSocietate = service.getDateSocietate(formGroup) as any;

        expect(dateSocietate).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDateSocietate should not enable id FormControl', () => {
        const formGroup = service.createDateSocietateFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDateSocietate should disable id FormControl', () => {
        const formGroup = service.createDateSocietateFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
