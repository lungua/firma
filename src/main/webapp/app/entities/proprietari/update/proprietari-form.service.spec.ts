import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../proprietari.test-samples';

import { ProprietariFormService } from './proprietari-form.service';

describe('Proprietari Form Service', () => {
  let service: ProprietariFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProprietariFormService);
  });

  describe('Service methods', () => {
    describe('createProprietariFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProprietariFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fizicJuridic: expect.any(Object),
            nume: expect.any(Object),
            prenume: expect.any(Object),
            tip: expect.any(Object),
            serie: expect.any(Object),
            numar: expect.any(Object),
            cui: expect.any(Object),
            denumireSocietate: expect.any(Object),
            sediu3: expect.any(Object),
          })
        );
      });

      it('passing IProprietari should create a new form with FormGroup', () => {
        const formGroup = service.createProprietariFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fizicJuridic: expect.any(Object),
            nume: expect.any(Object),
            prenume: expect.any(Object),
            tip: expect.any(Object),
            serie: expect.any(Object),
            numar: expect.any(Object),
            cui: expect.any(Object),
            denumireSocietate: expect.any(Object),
            sediu3: expect.any(Object),
          })
        );
      });
    });

    describe('getProprietari', () => {
      it('should return NewProprietari for default Proprietari initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createProprietariFormGroup(sampleWithNewData);

        const proprietari = service.getProprietari(formGroup) as any;

        expect(proprietari).toMatchObject(sampleWithNewData);
      });

      it('should return NewProprietari for empty Proprietari initial value', () => {
        const formGroup = service.createProprietariFormGroup();

        const proprietari = service.getProprietari(formGroup) as any;

        expect(proprietari).toMatchObject({});
      });

      it('should return IProprietari', () => {
        const formGroup = service.createProprietariFormGroup(sampleWithRequiredData);

        const proprietari = service.getProprietari(formGroup) as any;

        expect(proprietari).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProprietari should not enable id FormControl', () => {
        const formGroup = service.createProprietariFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProprietari should disable id FormControl', () => {
        const formGroup = service.createProprietariFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
