import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CapitalSocialFormService } from './capital-social-form.service';
import { CapitalSocialService } from '../service/capital-social.service';
import { ICapitalSocial } from '../capital-social.model';
import { ISrl } from 'app/entities/srl/srl.model';
import { SrlService } from 'app/entities/srl/service/srl.service';

import { CapitalSocialUpdateComponent } from './capital-social-update.component';

describe('CapitalSocial Management Update Component', () => {
  let comp: CapitalSocialUpdateComponent;
  let fixture: ComponentFixture<CapitalSocialUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let capitalSocialFormService: CapitalSocialFormService;
  let capitalSocialService: CapitalSocialService;
  let srlService: SrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CapitalSocialUpdateComponent],
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
      .overrideTemplate(CapitalSocialUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CapitalSocialUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    capitalSocialFormService = TestBed.inject(CapitalSocialFormService);
    capitalSocialService = TestBed.inject(CapitalSocialService);
    srlService = TestBed.inject(SrlService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Srl query and add missing value', () => {
      const capitalSocial: ICapitalSocial = { id: 456 };
      const srl1: ISrl = { id: 32711 };
      capitalSocial.srl1 = srl1;

      const srlCollection: ISrl[] = [{ id: 48566 }];
      jest.spyOn(srlService, 'query').mockReturnValue(of(new HttpResponse({ body: srlCollection })));
      const additionalSrls = [srl1];
      const expectedCollection: ISrl[] = [...additionalSrls, ...srlCollection];
      jest.spyOn(srlService, 'addSrlToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ capitalSocial });
      comp.ngOnInit();

      expect(srlService.query).toHaveBeenCalled();
      expect(srlService.addSrlToCollectionIfMissing).toHaveBeenCalledWith(srlCollection, ...additionalSrls.map(expect.objectContaining));
      expect(comp.srlsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const capitalSocial: ICapitalSocial = { id: 456 };
      const srl1: ISrl = { id: 38648 };
      capitalSocial.srl1 = srl1;

      activatedRoute.data = of({ capitalSocial });
      comp.ngOnInit();

      expect(comp.srlsSharedCollection).toContain(srl1);
      expect(comp.capitalSocial).toEqual(capitalSocial);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICapitalSocial>>();
      const capitalSocial = { id: 123 };
      jest.spyOn(capitalSocialFormService, 'getCapitalSocial').mockReturnValue(capitalSocial);
      jest.spyOn(capitalSocialService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ capitalSocial });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: capitalSocial }));
      saveSubject.complete();

      // THEN
      expect(capitalSocialFormService.getCapitalSocial).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(capitalSocialService.update).toHaveBeenCalledWith(expect.objectContaining(capitalSocial));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICapitalSocial>>();
      const capitalSocial = { id: 123 };
      jest.spyOn(capitalSocialFormService, 'getCapitalSocial').mockReturnValue({ id: null });
      jest.spyOn(capitalSocialService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ capitalSocial: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: capitalSocial }));
      saveSubject.complete();

      // THEN
      expect(capitalSocialFormService.getCapitalSocial).toHaveBeenCalled();
      expect(capitalSocialService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICapitalSocial>>();
      const capitalSocial = { id: 123 };
      jest.spyOn(capitalSocialService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ capitalSocial });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(capitalSocialService.update).toHaveBeenCalled();
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
