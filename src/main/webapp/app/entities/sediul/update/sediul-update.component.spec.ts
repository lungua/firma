import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SediulFormService } from './sediul-form.service';
import { SediulService } from '../service/sediul.service';
import { ISediul } from '../sediul.model';
import { IActivitatiPrincipale } from 'app/entities/activitati-principale/activitati-principale.model';
import { ActivitatiPrincipaleService } from 'app/entities/activitati-principale/service/activitati-principale.service';
import { IActivitatiSecundare } from 'app/entities/activitati-secundare/activitati-secundare.model';
import { ActivitatiSecundareService } from 'app/entities/activitati-secundare/service/activitati-secundare.service';
import { ISrl } from 'app/entities/srl/srl.model';
import { SrlService } from 'app/entities/srl/service/srl.service';

import { SediulUpdateComponent } from './sediul-update.component';

describe('Sediul Management Update Component', () => {
  let comp: SediulUpdateComponent;
  let fixture: ComponentFixture<SediulUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let sediulFormService: SediulFormService;
  let sediulService: SediulService;
  let activitatiPrincipaleService: ActivitatiPrincipaleService;
  let activitatiSecundareService: ActivitatiSecundareService;
  let srlService: SrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SediulUpdateComponent],
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
      .overrideTemplate(SediulUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SediulUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    sediulFormService = TestBed.inject(SediulFormService);
    sediulService = TestBed.inject(SediulService);
    activitatiPrincipaleService = TestBed.inject(ActivitatiPrincipaleService);
    activitatiSecundareService = TestBed.inject(ActivitatiSecundareService);
    srlService = TestBed.inject(SrlService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ActivitatiPrincipale query and add missing value', () => {
      const sediul: ISediul = { id: 456 };
      const actprinc1s: IActivitatiPrincipale[] = [{ id: 23978 }];
      sediul.actprinc1s = actprinc1s;

      const activitatiPrincipaleCollection: IActivitatiPrincipale[] = [{ id: 27265 }];
      jest.spyOn(activitatiPrincipaleService, 'query').mockReturnValue(of(new HttpResponse({ body: activitatiPrincipaleCollection })));
      const additionalActivitatiPrincipales = [...actprinc1s];
      const expectedCollection: IActivitatiPrincipale[] = [...additionalActivitatiPrincipales, ...activitatiPrincipaleCollection];
      jest.spyOn(activitatiPrincipaleService, 'addActivitatiPrincipaleToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ sediul });
      comp.ngOnInit();

      expect(activitatiPrincipaleService.query).toHaveBeenCalled();
      expect(activitatiPrincipaleService.addActivitatiPrincipaleToCollectionIfMissing).toHaveBeenCalledWith(
        activitatiPrincipaleCollection,
        ...additionalActivitatiPrincipales.map(expect.objectContaining)
      );
      expect(comp.activitatiPrincipalesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ActivitatiSecundare query and add missing value', () => {
      const sediul: ISediul = { id: 456 };
      const actprinc2s: IActivitatiSecundare[] = [{ id: 27090 }];
      sediul.actprinc2s = actprinc2s;

      const activitatiSecundareCollection: IActivitatiSecundare[] = [{ id: 15816 }];
      jest.spyOn(activitatiSecundareService, 'query').mockReturnValue(of(new HttpResponse({ body: activitatiSecundareCollection })));
      const additionalActivitatiSecundares = [...actprinc2s];
      const expectedCollection: IActivitatiSecundare[] = [...additionalActivitatiSecundares, ...activitatiSecundareCollection];
      jest.spyOn(activitatiSecundareService, 'addActivitatiSecundareToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ sediul });
      comp.ngOnInit();

      expect(activitatiSecundareService.query).toHaveBeenCalled();
      expect(activitatiSecundareService.addActivitatiSecundareToCollectionIfMissing).toHaveBeenCalledWith(
        activitatiSecundareCollection,
        ...additionalActivitatiSecundares.map(expect.objectContaining)
      );
      expect(comp.activitatiSecundaresSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Srl query and add missing value', () => {
      const sediul: ISediul = { id: 456 };
      const srl4: ISrl = { id: 97322 };
      sediul.srl4 = srl4;

      const srlCollection: ISrl[] = [{ id: 62103 }];
      jest.spyOn(srlService, 'query').mockReturnValue(of(new HttpResponse({ body: srlCollection })));
      const additionalSrls = [srl4];
      const expectedCollection: ISrl[] = [...additionalSrls, ...srlCollection];
      jest.spyOn(srlService, 'addSrlToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ sediul });
      comp.ngOnInit();

      expect(srlService.query).toHaveBeenCalled();
      expect(srlService.addSrlToCollectionIfMissing).toHaveBeenCalledWith(srlCollection, ...additionalSrls.map(expect.objectContaining));
      expect(comp.srlsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const sediul: ISediul = { id: 456 };
      const actprinc1: IActivitatiPrincipale = { id: 76495 };
      sediul.actprinc1s = [actprinc1];
      const actprinc2: IActivitatiSecundare = { id: 15999 };
      sediul.actprinc2s = [actprinc2];
      const srl4: ISrl = { id: 83857 };
      sediul.srl4 = srl4;

      activatedRoute.data = of({ sediul });
      comp.ngOnInit();

      expect(comp.activitatiPrincipalesSharedCollection).toContain(actprinc1);
      expect(comp.activitatiSecundaresSharedCollection).toContain(actprinc2);
      expect(comp.srlsSharedCollection).toContain(srl4);
      expect(comp.sediul).toEqual(sediul);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISediul>>();
      const sediul = { id: 123 };
      jest.spyOn(sediulFormService, 'getSediul').mockReturnValue(sediul);
      jest.spyOn(sediulService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sediul });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sediul }));
      saveSubject.complete();

      // THEN
      expect(sediulFormService.getSediul).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(sediulService.update).toHaveBeenCalledWith(expect.objectContaining(sediul));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISediul>>();
      const sediul = { id: 123 };
      jest.spyOn(sediulFormService, 'getSediul').mockReturnValue({ id: null });
      jest.spyOn(sediulService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sediul: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sediul }));
      saveSubject.complete();

      // THEN
      expect(sediulFormService.getSediul).toHaveBeenCalled();
      expect(sediulService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISediul>>();
      const sediul = { id: 123 };
      jest.spyOn(sediulService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sediul });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(sediulService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareActivitatiPrincipale', () => {
      it('Should forward to activitatiPrincipaleService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(activitatiPrincipaleService, 'compareActivitatiPrincipale');
        comp.compareActivitatiPrincipale(entity, entity2);
        expect(activitatiPrincipaleService.compareActivitatiPrincipale).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareActivitatiSecundare', () => {
      it('Should forward to activitatiSecundareService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(activitatiSecundareService, 'compareActivitatiSecundare');
        comp.compareActivitatiSecundare(entity, entity2);
        expect(activitatiSecundareService.compareActivitatiSecundare).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareSrl', () => {
      it('Should forward to srlService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(srlService, 'compareSrl');
        comp.compareSrl(entity, entity2);
        expect(srlService.compareSrl).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
