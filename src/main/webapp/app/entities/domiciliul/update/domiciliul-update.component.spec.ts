import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DomiciliulFormService } from './domiciliul-form.service';
import { DomiciliulService } from '../service/domiciliul.service';
import { IDomiciliul } from '../domiciliul.model';
import { IAsocAdmin } from 'app/entities/asoc-admin/asoc-admin.model';
import { AsocAdminService } from 'app/entities/asoc-admin/service/asoc-admin.service';

import { DomiciliulUpdateComponent } from './domiciliul-update.component';

describe('Domiciliul Management Update Component', () => {
  let comp: DomiciliulUpdateComponent;
  let fixture: ComponentFixture<DomiciliulUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let domiciliulFormService: DomiciliulFormService;
  let domiciliulService: DomiciliulService;
  let asocAdminService: AsocAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DomiciliulUpdateComponent],
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
      .overrideTemplate(DomiciliulUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DomiciliulUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    domiciliulFormService = TestBed.inject(DomiciliulFormService);
    domiciliulService = TestBed.inject(DomiciliulService);
    asocAdminService = TestBed.inject(AsocAdminService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call AsocAdmin query and add missing value', () => {
      const domiciliul: IDomiciliul = { id: 456 };
      const asocadmin3: IAsocAdmin = { id: 36191 };
      domiciliul.asocadmin3 = asocadmin3;

      const asocAdminCollection: IAsocAdmin[] = [{ id: 25380 }];
      jest.spyOn(asocAdminService, 'query').mockReturnValue(of(new HttpResponse({ body: asocAdminCollection })));
      const additionalAsocAdmins = [asocadmin3];
      const expectedCollection: IAsocAdmin[] = [...additionalAsocAdmins, ...asocAdminCollection];
      jest.spyOn(asocAdminService, 'addAsocAdminToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ domiciliul });
      comp.ngOnInit();

      expect(asocAdminService.query).toHaveBeenCalled();
      expect(asocAdminService.addAsocAdminToCollectionIfMissing).toHaveBeenCalledWith(
        asocAdminCollection,
        ...additionalAsocAdmins.map(expect.objectContaining)
      );
      expect(comp.asocAdminsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const domiciliul: IDomiciliul = { id: 456 };
      const asocadmin3: IAsocAdmin = { id: 25717 };
      domiciliul.asocadmin3 = asocadmin3;

      activatedRoute.data = of({ domiciliul });
      comp.ngOnInit();

      expect(comp.asocAdminsSharedCollection).toContain(asocadmin3);
      expect(comp.domiciliul).toEqual(domiciliul);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDomiciliul>>();
      const domiciliul = { id: 123 };
      jest.spyOn(domiciliulFormService, 'getDomiciliul').mockReturnValue(domiciliul);
      jest.spyOn(domiciliulService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ domiciliul });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: domiciliul }));
      saveSubject.complete();

      // THEN
      expect(domiciliulFormService.getDomiciliul).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(domiciliulService.update).toHaveBeenCalledWith(expect.objectContaining(domiciliul));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDomiciliul>>();
      const domiciliul = { id: 123 };
      jest.spyOn(domiciliulFormService, 'getDomiciliul').mockReturnValue({ id: null });
      jest.spyOn(domiciliulService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ domiciliul: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: domiciliul }));
      saveSubject.complete();

      // THEN
      expect(domiciliulFormService.getDomiciliul).toHaveBeenCalled();
      expect(domiciliulService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDomiciliul>>();
      const domiciliul = { id: 123 };
      jest.spyOn(domiciliulService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ domiciliul });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(domiciliulService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAsocAdmin', () => {
      it('Should forward to asocAdminService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(asocAdminService, 'compareAsocAdmin');
        comp.compareAsocAdmin(entity, entity2);
        expect(asocAdminService.compareAsocAdmin).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
