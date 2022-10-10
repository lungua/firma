import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProprietariFormService } from './proprietari-form.service';
import { ProprietariService } from '../service/proprietari.service';
import { IProprietari } from '../proprietari.model';
import { ISediul } from 'app/entities/sediul/sediul.model';
import { SediulService } from 'app/entities/sediul/service/sediul.service';

import { ProprietariUpdateComponent } from './proprietari-update.component';

describe('Proprietari Management Update Component', () => {
  let comp: ProprietariUpdateComponent;
  let fixture: ComponentFixture<ProprietariUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let proprietariFormService: ProprietariFormService;
  let proprietariService: ProprietariService;
  let sediulService: SediulService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProprietariUpdateComponent],
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
      .overrideTemplate(ProprietariUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProprietariUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    proprietariFormService = TestBed.inject(ProprietariFormService);
    proprietariService = TestBed.inject(ProprietariService);
    sediulService = TestBed.inject(SediulService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Sediul query and add missing value', () => {
      const proprietari: IProprietari = { id: 456 };
      const sediu3: ISediul = { id: 80957 };
      proprietari.sediu3 = sediu3;

      const sediulCollection: ISediul[] = [{ id: 24538 }];
      jest.spyOn(sediulService, 'query').mockReturnValue(of(new HttpResponse({ body: sediulCollection })));
      const additionalSediuls = [sediu3];
      const expectedCollection: ISediul[] = [...additionalSediuls, ...sediulCollection];
      jest.spyOn(sediulService, 'addSediulToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ proprietari });
      comp.ngOnInit();

      expect(sediulService.query).toHaveBeenCalled();
      expect(sediulService.addSediulToCollectionIfMissing).toHaveBeenCalledWith(
        sediulCollection,
        ...additionalSediuls.map(expect.objectContaining)
      );
      expect(comp.sediulsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const proprietari: IProprietari = { id: 456 };
      const sediu3: ISediul = { id: 87419 };
      proprietari.sediu3 = sediu3;

      activatedRoute.data = of({ proprietari });
      comp.ngOnInit();

      expect(comp.sediulsSharedCollection).toContain(sediu3);
      expect(comp.proprietari).toEqual(proprietari);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProprietari>>();
      const proprietari = { id: 123 };
      jest.spyOn(proprietariFormService, 'getProprietari').mockReturnValue(proprietari);
      jest.spyOn(proprietariService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ proprietari });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: proprietari }));
      saveSubject.complete();

      // THEN
      expect(proprietariFormService.getProprietari).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(proprietariService.update).toHaveBeenCalledWith(expect.objectContaining(proprietari));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProprietari>>();
      const proprietari = { id: 123 };
      jest.spyOn(proprietariFormService, 'getProprietari').mockReturnValue({ id: null });
      jest.spyOn(proprietariService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ proprietari: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: proprietari }));
      saveSubject.complete();

      // THEN
      expect(proprietariFormService.getProprietari).toHaveBeenCalled();
      expect(proprietariService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProprietari>>();
      const proprietari = { id: 123 };
      jest.spyOn(proprietariService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ proprietari });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(proprietariService.update).toHaveBeenCalled();
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
