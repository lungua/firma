import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DateAsociatiFormService } from './date-asociati-form.service';
import { DateAsociatiService } from '../service/date-asociati.service';
import { IDateAsociati } from '../date-asociati.model';
import { IAsocAdmin } from 'app/entities/asoc-admin/asoc-admin.model';
import { AsocAdminService } from 'app/entities/asoc-admin/service/asoc-admin.service';

import { DateAsociatiUpdateComponent } from './date-asociati-update.component';

describe('DateAsociati Management Update Component', () => {
  let comp: DateAsociatiUpdateComponent;
  let fixture: ComponentFixture<DateAsociatiUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dateAsociatiFormService: DateAsociatiFormService;
  let dateAsociatiService: DateAsociatiService;
  let asocAdminService: AsocAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DateAsociatiUpdateComponent],
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
      .overrideTemplate(DateAsociatiUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DateAsociatiUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dateAsociatiFormService = TestBed.inject(DateAsociatiFormService);
    dateAsociatiService = TestBed.inject(DateAsociatiService);
    asocAdminService = TestBed.inject(AsocAdminService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call AsocAdmin query and add missing value', () => {
      const dateAsociati: IDateAsociati = { id: 456 };
      const asocadmin4: IAsocAdmin = { id: 62318 };
      dateAsociati.asocadmin4 = asocadmin4;

      const asocAdminCollection: IAsocAdmin[] = [{ id: 65087 }];
      jest.spyOn(asocAdminService, 'query').mockReturnValue(of(new HttpResponse({ body: asocAdminCollection })));
      const additionalAsocAdmins = [asocadmin4];
      const expectedCollection: IAsocAdmin[] = [...additionalAsocAdmins, ...asocAdminCollection];
      jest.spyOn(asocAdminService, 'addAsocAdminToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dateAsociati });
      comp.ngOnInit();

      expect(asocAdminService.query).toHaveBeenCalled();
      expect(asocAdminService.addAsocAdminToCollectionIfMissing).toHaveBeenCalledWith(
        asocAdminCollection,
        ...additionalAsocAdmins.map(expect.objectContaining)
      );
      expect(comp.asocAdminsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const dateAsociati: IDateAsociati = { id: 456 };
      const asocadmin4: IAsocAdmin = { id: 38654 };
      dateAsociati.asocadmin4 = asocadmin4;

      activatedRoute.data = of({ dateAsociati });
      comp.ngOnInit();

      expect(comp.asocAdminsSharedCollection).toContain(asocadmin4);
      expect(comp.dateAsociati).toEqual(dateAsociati);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDateAsociati>>();
      const dateAsociati = { id: 123 };
      jest.spyOn(dateAsociatiFormService, 'getDateAsociati').mockReturnValue(dateAsociati);
      jest.spyOn(dateAsociatiService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dateAsociati });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dateAsociati }));
      saveSubject.complete();

      // THEN
      expect(dateAsociatiFormService.getDateAsociati).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dateAsociatiService.update).toHaveBeenCalledWith(expect.objectContaining(dateAsociati));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDateAsociati>>();
      const dateAsociati = { id: 123 };
      jest.spyOn(dateAsociatiFormService, 'getDateAsociati').mockReturnValue({ id: null });
      jest.spyOn(dateAsociatiService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dateAsociati: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dateAsociati }));
      saveSubject.complete();

      // THEN
      expect(dateAsociatiFormService.getDateAsociati).toHaveBeenCalled();
      expect(dateAsociatiService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDateAsociati>>();
      const dateAsociati = { id: 123 };
      jest.spyOn(dateAsociatiService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dateAsociati });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dateAsociatiService.update).toHaveBeenCalled();
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
