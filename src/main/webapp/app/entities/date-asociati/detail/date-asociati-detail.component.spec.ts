import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DateAsociatiDetailComponent } from './date-asociati-detail.component';

describe('DateAsociati Management Detail Component', () => {
  let comp: DateAsociatiDetailComponent;
  let fixture: ComponentFixture<DateAsociatiDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateAsociatiDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ dateAsociati: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DateAsociatiDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DateAsociatiDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load dateAsociati on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.dateAsociati).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
