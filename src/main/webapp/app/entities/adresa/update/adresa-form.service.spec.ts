import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../adresa.test-samples';

import { AdresaFormService } from './adresa-form.service';

describe('Adresa Form Service', () => {
  let service: AdresaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdresaFormService);
  });

  describe('Service methods', () => {
    describe('createAdresaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAdresaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            strada: expect.any(Object),
            numarul: expect.any(Object),
            localitatea: expect.any(Object),
            judetul: expect.any(Object),
            bloc: expect.any(Object),
            scara: expect.any(Object),
            etaj: expect.any(Object),
            apartament: expect.any(Object),
            alteDetalii: expect.any(Object),
            asociatieLocatari: expect.any(Object),
            sediu1: expect.any(Object),
          })
        );
      });

      it('passing IAdresa should create a new form with FormGroup', () => {
        const formGroup = service.createAdresaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            strada: expect.any(Object),
            numarul: expect.any(Object),
            localitatea: expect.any(Object),
            judetul: expect.any(Object),
            bloc: expect.any(Object),
            scara: expect.any(Object),
            etaj: expect.any(Object),
            apartament: expect.any(Object),
            alteDetalii: expect.any(Object),
            asociatieLocatari: expect.any(Object),
            sediu1: expect.any(Object),
          })
        );
      });
    });

    describe('getAdresa', () => {
      it('should return NewAdresa for default Adresa initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAdresaFormGroup(sampleWithNewData);

        const adresa = service.getAdresa(formGroup) as any;

        expect(adresa).toMatchObject(sampleWithNewData);
      });

      it('should return NewAdresa for empty Adresa initial value', () => {
        const formGroup = service.createAdresaFormGroup();

        const adresa = service.getAdresa(formGroup) as any;

        expect(adresa).toMatchObject({});
      });

      it('should return IAdresa', () => {
        const formGroup = service.createAdresaFormGroup(sampleWithRequiredData);

        const adresa = service.getAdresa(formGroup) as any;

        expect(adresa).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAdresa should not enable id FormControl', () => {
        const formGroup = service.createAdresaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAdresa should disable id FormControl', () => {
        const formGroup = service.createAdresaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
