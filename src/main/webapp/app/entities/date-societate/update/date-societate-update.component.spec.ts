import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DateSocietateFormService } from './date-societate-form.service';
import { DateSocietateService } from '../service/date-societate.service';
import { IDateSocietate } from '../date-societate.model';
import { IAsocAdmin } from 'app/entities/asoc-admin/asoc-admin.model';
import { AsocAdminService } from 'app/entities/asoc-admin/service/asoc-admin.service';

import { DateSocietateUpdateComponent } from './date-societate-update.component';

describe('DateSocietate Management Update Component', () => {
  let comp: DateSocietateUpdateComponent;
  let fixture: ComponentFixture<DateSocietateUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dateSocietateFormService: DateSocietateFormService;
  let dateSocietateService: DateSocietateService;
  let asocAdminService: AsocAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DateSocietateUpdateComponent],
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
      .overrideTemplate(DateSocietateUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DateSocietateUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dateSocietateFormService = TestBed.inject(DateSocietateFormService);
    dateSocietateService = TestBed.inject(DateSocietateService);
    asocAdminService = TestBed.inject(AsocAdminService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call AsocAdmin query and add missing value', () => {
      const dateSocietate: IDateSocietate = { id: 456 };
      const asocadmin2: IAsocAdmin = { id: 72881 };
      dateSocietate.asocadmin2 = asocadmin2;

      const asocAdminCollection: IAsocAdmin[] = [{ id: 33317 }];
      jest.spyOn(asocAdminService, 'query').mockReturnValue(of(new HttpResponse({ body: asocAdminCollection })));
      const additionalAsocAdmins = [asocadmin2];
      const expectedCollection: IAsocAdmin[] = [...additionalAsocAdmins, ...asocAdminCollection];
      jest.spyOn(asocAdminService, 'addAsocAdminToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dateSocietate });
      comp.ngOnInit();

      expect(asocAdminService.query).toHaveBeenCalled();
      expect(asocAdminService.addAsocAdminToCollectionIfMissing).toHaveBeenCalledWith(
        asocAdminCollection,
        ...additionalAsocAdmins.map(expect.objectContaining)
      );
      expect(comp.asocAdminsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const dateSocietate: IDateSocietate = { id: 456 };
      const asocadmin2: IAsocAdmin = { id: 54710 };
      dateSocietate.asocadmin2 = asocadmin2;

      activatedRoute.data = of({ dateSocietate });
      comp.ngOnInit();

      expect(comp.asocAdminsSharedCollection).toContain(asocadmin2);
      expect(comp.dateSocietate).toEqual(dateSocietate);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDateSocietate>>();
      const dateSocietate = { id: 123 };
      jest.spyOn(dateSocietateFormService, 'getDateSocietate').mockReturnValue(dateSocietate);
      jest.spyOn(dateSocietateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dateSocietate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dateSocietate }));
      saveSubject.complete();

      // THEN
      expect(dateSocietateFormService.getDateSocietate).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dateSocietateService.update).toHaveBeenCalledWith(expect.objectContaining(dateSocietate));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDateSocietate>>();
      const dateSocietate = { id: 123 };
      jest.spyOn(dateSocietateFormService, 'getDateSocietate').mockReturnValue({ id: null });
      jest.spyOn(dateSocietateService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dateSocietate: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dateSocietate }));
      saveSubject.complete();

      // THEN
      expect(dateSocietateFormService.getDateSocietate).toHaveBeenCalled();
      expect(dateSocietateService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDateSocietate>>();
      const dateSocietate = { id: 123 };
      jest.spyOn(dateSocietateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dateSocietate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dateSocietateService.update).toHaveBeenCalled();
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
