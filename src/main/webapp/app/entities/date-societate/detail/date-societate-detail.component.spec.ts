import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DateSocietateDetailComponent } from './date-societate-detail.component';

describe('DateSocietate Management Detail Component', () => {
  let comp: DateSocietateDetailComponent;
  let fixture: ComponentFixture<DateSocietateDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateSocietateDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ dateSocietate: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DateSocietateDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DateSocietateDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load dateSocietate on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.dateSocietate).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
