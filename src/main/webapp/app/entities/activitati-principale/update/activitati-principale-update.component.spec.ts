import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ActivitatiPrincipaleFormService } from './activitati-principale-form.service';
import { ActivitatiPrincipaleService } from '../service/activitati-principale.service';
import { IActivitatiPrincipale } from '../activitati-principale.model';
import { ISrl } from 'app/entities/srl/srl.model';
import { SrlService } from 'app/entities/srl/service/srl.service';

import { ActivitatiPrincipaleUpdateComponent } from './activitati-principale-update.component';

describe('ActivitatiPrincipale Management Update Component', () => {
  let comp: ActivitatiPrincipaleUpdateComponent;
  let fixture: ComponentFixture<ActivitatiPrincipaleUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let activitatiPrincipaleFormService: ActivitatiPrincipaleFormService;
  let activitatiPrincipaleService: ActivitatiPrincipaleService;
  let srlService: SrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ActivitatiPrincipaleUpdateComponent],
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
      .overrideTemplate(ActivitatiPrincipaleUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ActivitatiPrincipaleUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    activitatiPrincipaleFormService = TestBed.inject(ActivitatiPrincipaleFormService);
    activitatiPrincipaleService = TestBed.inject(ActivitatiPrincipaleService);
    srlService = TestBed.inject(SrlService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Srl query and add missing value', () => {
      const activitatiPrincipale: IActivitatiPrincipale = { id: 456 };
      const srl3: ISrl = { id: 74660 };
      activitatiPrincipale.srl3 = srl3;

      const srlCollection: ISrl[] = [{ id: 2042 }];
      jest.spyOn(srlService, 'query').mockReturnValue(of(new HttpResponse({ body: srlCollection })));
      const additionalSrls = [srl3];
      const expectedCollection: ISrl[] = [...additionalSrls, ...srlCollection];
      jest.spyOn(srlService, 'addSrlToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ activitatiPrincipale });
      comp.ngOnInit();

      expect(srlService.query).toHaveBeenCalled();
      expect(srlService.addSrlToCollectionIfMissing).toHaveBeenCalledWith(srlCollection, ...additionalSrls.map(expect.objectContaining));
      expect(comp.srlsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const activitatiPrincipale: IActivitatiPrincipale = { id: 456 };
      const srl3: ISrl = { id: 1004 };
      activitatiPrincipale.srl3 = srl3;

      activatedRoute.data = of({ activitatiPrincipale });
      comp.ngOnInit();

      expect(comp.srlsSharedCollection).toContain(srl3);
      expect(comp.activitatiPrincipale).toEqual(activitatiPrincipale);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IActivitatiPrincipale>>();
      const activitatiPrincipale = { id: 123 };
      jest.spyOn(activitatiPrincipaleFormService, 'getActivitatiPrincipale').mockReturnValue(activitatiPrincipale);
      jest.spyOn(activitatiPrincipaleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ activitatiPrincipale });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: activitatiPrincipale }));
      saveSubject.complete();

      // THEN
      expect(activitatiPrincipaleFormService.getActivitatiPrincipale).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(activitatiPrincipaleService.update).toHaveBeenCalledWith(expect.objectContaining(activitatiPrincipale));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IActivitatiPrincipale>>();
      const activitatiPrincipale = { id: 123 };
      jest.spyOn(activitatiPrincipaleFormService, 'getActivitatiPrincipale').mockReturnValue({ id: null });
      jest.spyOn(activitatiPrincipaleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ activitatiPrincipale: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: activitatiPrincipale }));
      saveSubject.complete();

      // THEN
      expect(activitatiPrincipaleFormService.getActivitatiPrincipale).toHaveBeenCalled();
      expect(activitatiPrincipaleService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IActivitatiPrincipale>>();
      const activitatiPrincipale = { id: 123 };
      jest.spyOn(activitatiPrincipaleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ activitatiPrincipale });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(activitatiPrincipaleService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
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
