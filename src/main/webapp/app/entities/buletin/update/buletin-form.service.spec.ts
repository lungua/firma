import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../buletin.test-samples';

import { BuletinFormService } from './buletin-form.service';

describe('Buletin Form Service', () => {
  let service: BuletinFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuletinFormService);
  });

  describe('Service methods', () => {
    describe('createBuletinFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBuletinFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tip: expect.any(Object),
            serie: expect.any(Object),
            numar: expect.any(Object),
            cnp: expect.any(Object),
            tara: expect.any(Object),
            judet: expect.any(Object),
            localitate: expect.any(Object),
            cetatenie: expect.any(Object),
            data: expect.any(Object),
            eliberatDe: expect.any(Object),
            asocadmin1: expect.any(Object),
          })
        );
      });

      it('passing IBuletin should create a new form with FormGroup', () => {
        const formGroup = service.createBuletinFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tip: expect.any(Object),
            serie: expect.any(Object),
            numar: expect.any(Object),
            cnp: expect.any(Object),
            tara: expect.any(Object),
            judet: expect.any(Object),
            localitate: expect.any(Object),
            cetatenie: expect.any(Object),
            data: expect.any(Object),
            eliberatDe: expect.any(Object),
            asocadmin1: expect.any(Object),
          })
        );
      });
    });

    describe('getBuletin', () => {
      it('should return NewBuletin for default Buletin initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createBuletinFormGroup(sampleWithNewData);

        const buletin = service.getBuletin(formGroup) as any;

        expect(buletin).toMatchObject(sampleWithNewData);
      });

      it('should return NewBuletin for empty Buletin initial value', () => {
        const formGroup = service.createBuletinFormGroup();

        const buletin = service.getBuletin(formGroup) as any;

        expect(buletin).toMatchObject({});
      });

      it('should return IBuletin', () => {
        const formGroup = service.createBuletinFormGroup(sampleWithRequiredData);

        const buletin = service.getBuletin(formGroup) as any;

        expect(buletin).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBuletin should not enable id FormControl', () => {
        const formGroup = service.createBuletinFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBuletin should disable id FormControl', () => {
        const formGroup = service.createBuletinFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
