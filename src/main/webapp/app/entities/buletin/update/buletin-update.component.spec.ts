import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { BuletinFormService } from './buletin-form.service';
import { BuletinService } from '../service/buletin.service';
import { IBuletin } from '../buletin.model';
import { IAsocAdmin } from 'app/entities/asoc-admin/asoc-admin.model';
import { AsocAdminService } from 'app/entities/asoc-admin/service/asoc-admin.service';

import { BuletinUpdateComponent } from './buletin-update.component';

describe('Buletin Management Update Component', () => {
  let comp: BuletinUpdateComponent;
  let fixture: ComponentFixture<BuletinUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let buletinFormService: BuletinFormService;
  let buletinService: BuletinService;
  let asocAdminService: AsocAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [BuletinUpdateComponent],
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
      .overrideTemplate(BuletinUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BuletinUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    buletinFormService = TestBed.inject(BuletinFormService);
    buletinService = TestBed.inject(BuletinService);
    asocAdminService = TestBed.inject(AsocAdminService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call AsocAdmin query and add missing value', () => {
      const buletin: IBuletin = { id: 456 };
      const asocadmin1: IAsocAdmin = { id: 61372 };
      buletin.asocadmin1 = asocadmin1;

      const asocAdminCollection: IAsocAdmin[] = [{ id: 41921 }];
      jest.spyOn(asocAdminService, 'query').mockReturnValue(of(new HttpResponse({ body: asocAdminCollection })));
      const additionalAsocAdmins = [asocadmin1];
      const expectedCollection: IAsocAdmin[] = [...additionalAsocAdmins, ...asocAdminCollection];
      jest.spyOn(asocAdminService, 'addAsocAdminToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ buletin });
      comp.ngOnInit();

      expect(asocAdminService.query).toHaveBeenCalled();
      expect(asocAdminService.addAsocAdminToCollectionIfMissing).toHaveBeenCalledWith(
        asocAdminCollection,
        ...additionalAsocAdmins.map(expect.objectContaining)
      );
      expect(comp.asocAdminsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const buletin: IBuletin = { id: 456 };
      const asocadmin1: IAsocAdmin = { id: 8564 };
      buletin.asocadmin1 = asocadmin1;

      activatedRoute.data = of({ buletin });
      comp.ngOnInit();

      expect(comp.asocAdminsSharedCollection).toContain(asocadmin1);
      expect(comp.buletin).toEqual(buletin);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBuletin>>();
      const buletin = { id: 123 };
      jest.spyOn(buletinFormService, 'getBuletin').mockReturnValue(buletin);
      jest.spyOn(buletinService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ buletin });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: buletin }));
      saveSubject.complete();

      // THEN
      expect(buletinFormService.getBuletin).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(buletinService.update).toHaveBeenCalledWith(expect.objectContaining(buletin));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBuletin>>();
      const buletin = { id: 123 };
      jest.spyOn(buletinFormService, 'getBuletin').mockReturnValue({ id: null });
      jest.spyOn(buletinService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ buletin: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: buletin }));
      saveSubject.complete();

      // THEN
      expect(buletinFormService.getBuletin).toHaveBeenCalled();
      expect(buletinService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBuletin>>();
      const buletin = { id: 123 };
      jest.spyOn(buletinService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ buletin });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(buletinService.update).toHaveBeenCalled();
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
