import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AlteActivitatiFormService } from './alte-activitati-form.service';
import { AlteActivitatiService } from '../service/alte-activitati.service';
import { IAlteActivitati } from '../alte-activitati.model';
import { ISrl } from 'app/entities/srl/srl.model';
import { SrlService } from 'app/entities/srl/service/srl.service';

import { AlteActivitatiUpdateComponent } from './alte-activitati-update.component';

describe('AlteActivitati Management Update Component', () => {
  let comp: AlteActivitatiUpdateComponent;
  let fixture: ComponentFixture<AlteActivitatiUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let alteActivitatiFormService: AlteActivitatiFormService;
  let alteActivitatiService: AlteActivitatiService;
  let srlService: SrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AlteActivitatiUpdateComponent],
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
      .overrideTemplate(AlteActivitatiUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AlteActivitatiUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    alteActivitatiFormService = TestBed.inject(AlteActivitatiFormService);
    alteActivitatiService = TestBed.inject(AlteActivitatiService);
    srlService = TestBed.inject(SrlService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Srl query and add missing value', () => {
      const alteActivitati: IAlteActivitati = { id: 456 };
      const srl2: ISrl = { id: 19565 };
      alteActivitati.srl2 = srl2;

      const srlCollection: ISrl[] = [{ id: 21413 }];
      jest.spyOn(srlService, 'query').mockReturnValue(of(new HttpResponse({ body: srlCollection })));
      const additionalSrls = [srl2];
      const expectedCollection: ISrl[] = [...additionalSrls, ...srlCollection];
      jest.spyOn(srlService, 'addSrlToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ alteActivitati });
      comp.ngOnInit();

      expect(srlService.query).toHaveBeenCalled();
      expect(srlService.addSrlToCollectionIfMissing).toHaveBeenCalledWith(srlCollection, ...additionalSrls.map(expect.objectContaining));
      expect(comp.srlsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const alteActivitati: IAlteActivitati = { id: 456 };
      const srl2: ISrl = { id: 60956 };
      alteActivitati.srl2 = srl2;

      activatedRoute.data = of({ alteActivitati });
      comp.ngOnInit();

      expect(comp.srlsSharedCollection).toContain(srl2);
      expect(comp.alteActivitati).toEqual(alteActivitati);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAlteActivitati>>();
      const alteActivitati = { id: 123 };
      jest.spyOn(alteActivitatiFormService, 'getAlteActivitati').mockReturnValue(alteActivitati);
      jest.spyOn(alteActivitatiService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alteActivitati });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: alteActivitati }));
      saveSubject.complete();

      // THEN
      expect(alteActivitatiFormService.getAlteActivitati).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(alteActivitatiService.update).toHaveBeenCalledWith(expect.objectContaining(alteActivitati));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAlteActivitati>>();
      const alteActivitati = { id: 123 };
      jest.spyOn(alteActivitatiFormService, 'getAlteActivitati').mockReturnValue({ id: null });
      jest.spyOn(alteActivitatiService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alteActivitati: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: alteActivitati }));
      saveSubject.complete();

      // THEN
      expect(alteActivitatiFormService.getAlteActivitati).toHaveBeenCalled();
      expect(alteActivitatiService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAlteActivitati>>();
      const alteActivitati = { id: 123 };
      jest.spyOn(alteActivitatiService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alteActivitati });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(alteActivitatiService.update).toHaveBeenCalled();
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
