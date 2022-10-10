import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../srl.test-samples';

import { SrlFormService } from './srl-form.service';

describe('Srl Form Service', () => {
  let service: SrlFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrlFormService);
  });

  describe('Service methods', () => {
    describe('createSrlFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSrlFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nume1: expect.any(Object),
            nume2: expect.any(Object),
            nume3: expect.any(Object),
            numeSocietate: expect.any(Object),
            nuneFinal: expect.any(Object),
            dataInregistrare: expect.any(Object),
            telefon: expect.any(Object),
            email: expect.any(Object),
            srlFinalizat: expect.any(Object),
            logatCu: expect.any(Object),
          })
        );
      });

      it('passing ISrl should create a new form with FormGroup', () => {
        const formGroup = service.createSrlFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nume1: expect.any(Object),
            nume2: expect.any(Object),
            nume3: expect.any(Object),
            numeSocietate: expect.any(Object),
            nuneFinal: expect.any(Object),
            dataInregistrare: expect.any(Object),
            telefon: expect.any(Object),
            email: expect.any(Object),
            srlFinalizat: expect.any(Object),
            logatCu: expect.any(Object),
          })
        );
      });
    });

    describe('getSrl', () => {
      it('should return NewSrl for default Srl initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSrlFormGroup(sampleWithNewData);

        const srl = service.getSrl(formGroup) as any;

        expect(srl).toMatchObject(sampleWithNewData);
      });

      it('should return NewSrl for empty Srl initial value', () => {
        const formGroup = service.createSrlFormGroup();

        const srl = service.getSrl(formGroup) as any;

        expect(srl).toMatchObject({});
      });

      it('should return ISrl', () => {
        const formGroup = service.createSrlFormGroup(sampleWithRequiredData);

        const srl = service.getSrl(formGroup) as any;

        expect(srl).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISrl should not enable id FormControl', () => {
        const formGroup = service.createSrlFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSrl should disable id FormControl', () => {
        const formGroup = service.createSrlFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
