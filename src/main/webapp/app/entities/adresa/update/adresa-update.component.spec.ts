import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AdresaFormService } from './adresa-form.service';
import { AdresaService } from '../service/adresa.service';
import { IAdresa } from '../adresa.model';
import { ISediul } from 'app/entities/sediul/sediul.model';
import { SediulService } from 'app/entities/sediul/service/sediul.service';

import { AdresaUpdateComponent } from './adresa-update.component';

describe('Adresa Management Update Component', () => {
  let comp: AdresaUpdateComponent;
  let fixture: ComponentFixture<AdresaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let adresaFormService: AdresaFormService;
  let adresaService: AdresaService;
  let sediulService: SediulService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AdresaUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(AdresaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AdresaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    adresaFormService = TestBed.inject(AdresaFormService);
    adresaService = TestBed.inject(AdresaService);
    sediulService = TestBed.inject(SediulService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Sediul query and add missing value', () => {
      const adresa: IAdresa = { id: 456 };
      const sediu1: ISediul = { id: 14783 };
      adresa.sediu1 = sediu1;

      const sediulCollection: ISediul[] = [{ id: 35208 }];
      jest.spyOn(sediulService, 'query').mockReturnValue(of(new HttpResponse({ body: sediulCollection })));
      const additionalSediuls = [sediu1];
      const expectedCollection: ISediul[] = [...additionalSediuls, ...sediulCollection];
      jest.spyOn(sediulService, 'addSediulToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ adresa });
      comp.ngOnInit();

      expect(sediulService.query).toHaveBeenCalled();
      expect(sediulService.addSediulToCollectionIfMissing).toHaveBeenCalledWith(
        sediulCollection,
        ...additionalSediuls.map(expect.objectContaining)
      );
      expect(comp.sediulsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const adresa: IAdresa = { id: 456 };
      const sediu1: ISediul = { id: 14401 };
      adresa.sediu1 = sediu1;

      activatedRoute.data = of({ adresa });
      comp.ngOnInit();

      expect(comp.sediulsSharedCollection).toContain(sediu1);
      expect(comp.adresa).toEqual(adresa);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAdresa>>();
      const adresa = { id: 123 };
      jest.spyOn(adresaFormService, 'getAdresa').mockReturnValue(adresa);
      jest.spyOn(adresaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ adresa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: adresa }));
      saveSubject.complete();

      // THEN
      expect(adresaFormService.getAdresa).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(adresaService.update).toHaveBeenCalledWith(expect.objectContaining(adresa));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAdresa>>();
      const adresa = { id: 123 };
      jest.spyOn(adresaFormService, 'getAdresa').mockReturnValue({ id: null });
      jest.spyOn(adresaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ adresa: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: adresa }));
      saveSubject.complete();

      // THEN
      expect(adresaFormService.getAdresa).toHaveBeenCalled();
      expect(adresaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAdresa>>();
      const adresa = { id: 123 };
      jest.spyOn(adresaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ adresa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(adresaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareSediul', () => {
      it('Should forward to sediulService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(sediulService, 'compareSediul');
        comp.compareSediul(entity, entity2);
        expect(sediulService.compareSediul).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
