import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SumaIncasataDetailComponent } from './suma-incasata-detail.component';

describe('SumaIncasata Management Detail Component', () => {
  let comp: SumaIncasataDetailComponent;
  let fixture: ComponentFixture<SumaIncasataDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SumaIncasataDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ sumaIncasata: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SumaIncasataDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SumaIncasataDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load sumaIncasata on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.sumaIncasata).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
