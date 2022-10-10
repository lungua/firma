import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AsocAdminFormService } from './asoc-admin-form.service';
import { AsocAdminService } from '../service/asoc-admin.service';
import { IAsocAdmin } from '../asoc-admin.model';
import { ISrl } from 'app/entities/srl/srl.model';
import { SrlService } from 'app/entities/srl/service/srl.service';

import { AsocAdminUpdateComponent } from './asoc-admin-update.component';

describe('AsocAdmin Management Update Component', () => {
  let comp: AsocAdminUpdateComponent;
  let fixture: ComponentFixture<AsocAdminUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let asocAdminFormService: AsocAdminFormService;
  let asocAdminService: AsocAdminService;
  let srlService: SrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AsocAdminUpdateComponent],
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
      .overrideTemplate(AsocAdminUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AsocAdminUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    asocAdminFormService = TestBed.inject(AsocAdminFormService);
    asocAdminService = TestBed.inject(AsocAdminService);
    srlService = TestBed.inject(SrlService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Srl query and add missing value', () => {
      const asocAdmin: IAsocAdmin = { id: 456 };
      const srl: ISrl = { id: 47103 };
      asocAdmin.srl = srl;

      const srlCollection: ISrl[] = [{ id: 61857 }];
      jest.spyOn(srlService, 'query').mockReturnValue(of(new HttpResponse({ body: srlCollection })));
      const additionalSrls = [srl];
      const expectedCollection: ISrl[] = [...additionalSrls, ...srlCollection];
      jest.spyOn(srlService, 'addSrlToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ asocAdmin });
      comp.ngOnInit();

      expect(srlService.query).toHaveBeenCalled();
      expect(srlService.addSrlToCollectionIfMissing).toHaveBeenCalledWith(srlCollection, ...additionalSrls.map(expect.objectContaining));
      expect(comp.srlsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const asocAdmin: IAsocAdmin = { id: 456 };
      const srl: ISrl = { id: 3055 };
      asocAdmin.srl = srl;

      activatedRoute.data = of({ asocAdmin });
      comp.ngOnInit();

      expect(comp.srlsSharedCollection).toContain(srl);
      expect(comp.asocAdmin).toEqual(asocAdmin);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAsocAdmin>>();
      const asocAdmin = { id: 123 };
      jest.spyOn(asocAdminFormService, 'getAsocAdmin').mockReturnValue(asocAdmin);
      jest.spyOn(asocAdminService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ asocAdmin });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: asocAdmin }));
      saveSubject.complete();

      // THEN
      expect(asocAdminFormService.getAsocAdmin).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(asocAdminService.update).toHaveBeenCalledWith(expect.objectContaining(asocAdmin));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAsocAdmin>>();
      const asocAdmin = { id: 123 };
      jest.spyOn(asocAdminFormService, 'getAsocAdmin').mockReturnValue({ id: null });
      jest.spyOn(asocAdminService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ asocAdmin: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: asocAdmin }));
      saveSubject.complete();

      // THEN
      expect(asocAdminFormService.getAsocAdmin).toHaveBeenCalled();
      expect(asocAdminService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAsocAdmin>>();
      const asocAdmin = { id: 123 };
      jest.spyOn(asocAdminService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ asocAdmin });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(asocAdminService.update).toHaveBeenCalled();
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
