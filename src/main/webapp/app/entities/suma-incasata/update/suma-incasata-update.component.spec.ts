import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SumaIncasataFormService } from './suma-incasata-form.service';
import { SumaIncasataService } from '../service/suma-incasata.service';
import { ISumaIncasata } from '../suma-incasata.model';
import { ISrl } from 'app/entities/srl/srl.model';
import { SrlService } from 'app/entities/srl/service/srl.service';

import { SumaIncasataUpdateComponent } from './suma-incasata-update.component';

describe('SumaIncasata Management Update Component', () => {
  let comp: SumaIncasataUpdateComponent;
  let fixture: ComponentFixture<SumaIncasataUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let sumaIncasataFormService: SumaIncasataFormService;
  let sumaIncasataService: SumaIncasataService;
  let srlService: SrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SumaIncasataUpdateComponent],
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
      .overrideTemplate(SumaIncasataUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SumaIncasataUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    sumaIncasataFormService = TestBed.inject(SumaIncasataFormService);
    sumaIncasataService = TestBed.inject(SumaIncasataService);
    srlService = TestBed.inject(SrlService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Srl query and add missing value', () => {
      const sumaIncasata: ISumaIncasata = { id: 456 };
      const srl5: ISrl = { id: 9064 };
      sumaIncasata.srl5 = srl5;

      const srlCollection: ISrl[] = [{ id: 73819 }];
      jest.spyOn(srlService, 'query').mockReturnValue(of(new HttpResponse({ body: srlCollection })));
      const additionalSrls = [srl5];
      const expectedCollection: ISrl[] = [...additionalSrls, ...srlCollection];
      jest.spyOn(srlService, 'addSrlToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ sumaIncasata });
      comp.ngOnInit();

      expect(srlService.query).toHaveBeenCalled();
      expect(srlService.addSrlToCollectionIfMissing).toHaveBeenCalledWith(srlCollection, ...additionalSrls.map(expect.objectContaining));
      expect(comp.srlsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const sumaIncasata: ISumaIncasata = { id: 456 };
      const srl5: ISrl = { id: 38119 };
      sumaIncasata.srl5 = srl5;

      activatedRoute.data = of({ sumaIncasata });
      comp.ngOnInit();

      expect(comp.srlsSharedCollection).toContain(srl5);
      expect(comp.sumaIncasata).toEqual(sumaIncasata);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISumaIncasata>>();
      const sumaIncasata = { id: 123 };
      jest.spyOn(sumaIncasataFormService, 'getSumaIncasata').mockReturnValue(sumaIncasata);
      jest.spyOn(sumaIncasataService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sumaIncasata });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sumaIncasata }));
      saveSubject.complete();

      // THEN
      expect(sumaIncasataFormService.getSumaIncasata).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(sumaIncasataService.update).toHaveBeenCalledWith(expect.objectContaining(sumaIncasata));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISumaIncasata>>();
      const sumaIncasata = { id: 123 };
      jest.spyOn(sumaIncasataFormService, 'getSumaIncasata').mockReturnValue({ id: null });
      jest.spyOn(sumaIncasataService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sumaIncasata: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sumaIncasata }));
      saveSubject.complete();

      // THEN
      expect(sumaIncasataFormService.getSumaIncasata).toHaveBeenCalled();
      expect(sumaIncasataService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISumaIncasata>>();
      const sumaIncasata = { id: 123 };
      jest.spyOn(sumaIncasataService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sumaIncasata });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(sumaIncasataService.update).toHaveBeenCalled();
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
