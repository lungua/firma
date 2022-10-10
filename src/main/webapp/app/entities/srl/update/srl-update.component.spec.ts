import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SrlFormService } from './srl-form.service';
import { SrlService } from '../service/srl.service';
import { ISrl } from '../srl.model';

import { SrlUpdateComponent } from './srl-update.component';

describe('Srl Management Update Component', () => {
  let comp: SrlUpdateComponent;
  let fixture: ComponentFixture<SrlUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let srlFormService: SrlFormService;
  let srlService: SrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SrlUpdateComponent],
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
      .overrideTemplate(SrlUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SrlUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    srlFormService = TestBed.inject(SrlFormService);
    srlService = TestBed.inject(SrlService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const srl: ISrl = { id: 456 };

      activatedRoute.data = of({ srl });
      comp.ngOnInit();

      expect(comp.srl).toEqual(srl);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISrl>>();
      const srl = { id: 123 };
      jest.spyOn(srlFormService, 'getSrl').mockReturnValue(srl);
      jest.spyOn(srlService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ srl });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: srl }));
      saveSubject.complete();

      // THEN
      expect(srlFormService.getSrl).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(srlService.update).toHaveBeenCalledWith(expect.objectContaining(srl));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISrl>>();
      const srl = { id: 123 };
      jest.spyOn(srlFormService, 'getSrl').mockReturnValue({ id: null });
      jest.spyOn(srlService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ srl: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: srl }));
      saveSubject.complete();

      // THEN
      expect(srlFormService.getSrl).toHaveBeenCalled();
      expect(srlService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISrl>>();
      const srl = { id: 123 };
      jest.spyOn(srlService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ srl });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(srlService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
