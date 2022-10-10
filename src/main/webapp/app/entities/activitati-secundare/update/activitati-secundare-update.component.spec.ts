import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ActivitatiSecundareFormService } from './activitati-secundare-form.service';
import { ActivitatiSecundareService } from '../service/activitati-secundare.service';
import { IActivitatiSecundare } from '../activitati-secundare.model';
import { ISrl } from 'app/entities/srl/srl.model';
import { SrlService } from 'app/entities/srl/service/srl.service';

import { ActivitatiSecundareUpdateComponent } from './activitati-secundare-update.component';

describe('ActivitatiSecundare Management Update Component', () => {
  let comp: ActivitatiSecundareUpdateComponent;
  let fixture: ComponentFixture<ActivitatiSecundareUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let activitatiSecundareFormService: ActivitatiSecundareFormService;
  let activitatiSecundareService: ActivitatiSecundareService;
  let srlService: SrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ActivitatiSecundareUpdateComponent],
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
      .overrideTemplate(ActivitatiSecundareUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ActivitatiSecundareUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    activitatiSecundareFormService = TestBed.inject(ActivitatiSecundareFormService);
    activitatiSecundareService = TestBed.inject(ActivitatiSecundareService);
    srlService = TestBed.inject(SrlService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Srl query and add missing value', () => {
      const activitatiSecundare: IActivitatiSecundare = { id: 456 };
      const srl5: ISrl = { id: 41094 };
      activitatiSecundare.srl5 = srl5;

      const srlCollection: ISrl[] = [{ id: 67422 }];
      jest.spyOn(srlService, 'query').mockReturnValue(of(new HttpResponse({ body: srlCollection })));
      const additionalSrls = [srl5];
      const expectedCollection: ISrl[] = [...additionalSrls, ...srlCollection];
      jest.spyOn(srlService, 'addSrlToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ activitatiSecundare });
      comp.ngOnInit();

      expect(srlService.query).toHaveBeenCalled();
      expect(srlService.addSrlToCollectionIfMissing).toHaveBeenCalledWith(srlCollection, ...additionalSrls.map(expect.objectContaining));
      expect(comp.srlsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const activitatiSecundare: IActivitatiSecundare = { id: 456 };
      const srl5: ISrl = { id: 41414 };
      activitatiSecundare.srl5 = srl5;

      activatedRoute.data = of({ activitatiSecundare });
      comp.ngOnInit();

      expect(comp.srlsSharedCollection).toContain(srl5);
      expect(comp.activitatiSecundare).toEqual(activitatiSecundare);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IActivitatiSecundare>>();
      const activitatiSecundare = { id: 123 };
      jest.spyOn(activitatiSecundareFormService, 'getActivitatiSecundare').mockReturnValue(activitatiSecundare);
      jest.spyOn(activitatiSecundareService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ activitatiSecundare });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: activitatiSecundare }));
      saveSubject.complete();

      // THEN
      expect(activitatiSecundareFormService.getActivitatiSecundare).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(activitatiSecundareService.update).toHaveBeenCalledWith(expect.objectContaining(activitatiSecundare));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IActivitatiSecundare>>();
      const activitatiSecundare = { id: 123 };
      jest.spyOn(activitatiSecundareFormService, 'getActivitatiSecundare').mockReturnValue({ id: null });
      jest.spyOn(activitatiSecundareService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ activitatiSecundare: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: activitatiSecundare }));
      saveSubject.complete();

      // THEN
      expect(activitatiSecundareFormService.getActivitatiSecundare).toHaveBeenCalled();
      expect(activitatiSecundareService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IActivitatiSecundare>>();
      const activitatiSecundare = { id: 123 };
      jest.spyOn(activitatiSecundareService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ activitatiSecundare });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(activitatiSecundareService.update).toHaveBeenCalled();
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
