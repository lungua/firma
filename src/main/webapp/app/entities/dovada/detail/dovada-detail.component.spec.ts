import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DovadaDetailComponent } from './dovada-detail.component';

describe('Dovada Management Detail Component', () => {
  let comp: DovadaDetailComponent;
  let fixture: ComponentFixture<DovadaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DovadaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ dovada: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DovadaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DovadaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load dovada on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.dovada).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
