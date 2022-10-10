import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../domiciliul.test-samples';

import { DomiciliulFormService } from './domiciliul-form.service';

describe('Domiciliul Form Service', () => {
  let service: DomiciliulFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomiciliulFormService);
  });

  describe('Service methods', () => {
    describe('createDomiciliulFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDomiciliulFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            adresaCI: expect.any(Object),
            asocadmin3: expect.any(Object),
          })
        );
      });

      it('passing IDomiciliul should create a new form with FormGroup', () => {
        const formGroup = service.createDomiciliulFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            adresaCI: expect.any(Object),
            asocadmin3: expect.any(Object),
          })
        );
      });
    });

    describe('getDomiciliul', () => {
      it('should return NewDomiciliul for default Domiciliul initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDomiciliulFormGroup(sampleWithNewData);

        const domiciliul = service.getDomiciliul(formGroup) as any;

        expect(domiciliul).toMatchObject(sampleWithNewData);
      });

      it('should return NewDomiciliul for empty Domiciliul initial value', () => {
        const formGroup = service.createDomiciliulFormGroup();

        const domiciliul = service.getDomiciliul(formGroup) as any;

        expect(domiciliul).toMatchObject({});
      });

      it('should return IDomiciliul', () => {
        const formGroup = service.createDomiciliulFormGroup(sampleWithRequiredData);

        const domiciliul = service.getDomiciliul(formGroup) as any;

        expect(domiciliul).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDomiciliul should not enable id FormControl', () => {
        const formGroup = service.createDomiciliulFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDomiciliul should disable id FormControl', () => {
        const formGroup = service.createDomiciliulFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
