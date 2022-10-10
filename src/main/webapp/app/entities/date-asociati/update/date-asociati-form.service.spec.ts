import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../date-asociati.test-samples';

import { DateAsociatiFormService } from './date-asociati-form.service';

describe('DateAsociati Form Service', () => {
  let service: DateAsociatiFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateAsociatiFormService);
  });

  describe('Service methods', () => {
    describe('createDateAsociatiFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDateAsociatiFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nume: expect.any(Object),
            prenume: expect.any(Object),
            telefon: expect.any(Object),
            asocadmin4: expect.any(Object),
          })
        );
      });

      it('passing IDateAsociati should create a new form with FormGroup', () => {
        const formGroup = service.createDateAsociatiFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nume: expect.any(Object),
            prenume: expect.any(Object),
            telefon: expect.any(Object),
            asocadmin4: expect.any(Object),
          })
        );
      });
    });

    describe('getDateAsociati', () => {
      it('should return NewDateAsociati for default DateAsociati initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDateAsociatiFormGroup(sampleWithNewData);

        const dateAsociati = service.getDateAsociati(formGroup) as any;

        expect(dateAsociati).toMatchObject(sampleWithNewData);
      });

      it('should return NewDateAsociati for empty DateAsociati initial value', () => {
        const formGroup = service.createDateAsociatiFormGroup();

        const dateAsociati = service.getDateAsociati(formGroup) as any;

        expect(dateAsociati).toMatchObject({});
      });

      it('should return IDateAsociati', () => {
        const formGroup = service.createDateAsociatiFormGroup(sampleWithRequiredData);

        const dateAsociati = service.getDateAsociati(formGroup) as any;

        expect(dateAsociati).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDateAsociati should not enable id FormControl', () => {
        const formGroup = service.createDateAsociatiFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDateAsociati should disable id FormControl', () => {
        const formGroup = service.createDateAsociatiFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
