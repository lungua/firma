import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DovadaFormService } from './dovada-form.service';
import { DovadaService } from '../service/dovada.service';
import { IDovada } from '../dovada.model';
import { ISediul } from 'app/entities/sediul/sediul.model';
import { SediulService } from 'app/entities/sediul/service/sediul.service';

import { DovadaUpdateComponent } from './dovada-update.component';

describe('Dovada Management Update Component', () => {
  let comp: DovadaUpdateComponent;
  let fixture: ComponentFixture<DovadaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dovadaFormService: DovadaFormService;
  let dovadaService: DovadaService;
  let sediulService: SediulService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DovadaUpdateComponent],
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
      .overrideTemplate(DovadaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DovadaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dovadaFormService = TestBed.inject(DovadaFormService);
    dovadaService = TestBed.inject(DovadaService);
    sediulService = TestBed.inject(SediulService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Sediul query and add missing value', () => {
      const dovada: IDovada = { id: 456 };
      const sediu2: ISediul = { id: 81836 };
      dovada.sediu2 = sediu2;

      const sediulCollection: ISediul[] = [{ id: 16320 }];
      jest.spyOn(sediulService, 'query').mockReturnValue(of(new HttpResponse({ body: sediulCollection })));
      const additionalSediuls = [sediu2];
      const expectedCollection: ISediul[] = [...additionalSediuls, ...sediulCollection];
      jest.spyOn(sediulService, 'addSediulToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dovada });
      comp.ngOnInit();

      expect(sediulService.query).toHaveBeenCalled();
      expect(sediulService.addSediulToCollectionIfMissing).toHaveBeenCalledWith(
        sediulCollection,
        ...additionalSediuls.map(expect.objectContaining)
      );
      expect(comp.sediulsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const dovada: IDovada = { id: 456 };
      const sediu2: ISediul = { id: 67053 };
      dovada.sediu2 = sediu2;

      activatedRoute.data = of({ dovada });
      comp.ngOnInit();

      expect(comp.sediulsSharedCollection).toContain(sediu2);
      expect(comp.dovada).toEqual(dovada);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDovada>>();
      const dovada = { id: 123 };
      jest.spyOn(dovadaFormService, 'getDovada').mockReturnValue(dovada);
      jest.spyOn(dovadaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dovada });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dovada }));
      saveSubject.complete();

      // THEN
      expect(dovadaFormService.getDovada).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dovadaService.update).toHaveBeenCalledWith(expect.objectContaining(dovada));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDovada>>();
      const dovada = { id: 123 };
      jest.spyOn(dovadaFormService, 'getDovada').mockReturnValue({ id: null });
      jest.spyOn(dovadaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dovada: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dovada }));
      saveSubject.complete();

      // THEN
      expect(dovadaFormService.getDovada).toHaveBeenCalled();
      expect(dovadaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDovada>>();
      const dovada = { id: 123 };
      jest.spyOn(dovadaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dovada });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dovadaService.update).toHaveBeenCalled();
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
