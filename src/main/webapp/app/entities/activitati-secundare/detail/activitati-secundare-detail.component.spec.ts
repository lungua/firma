import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ActivitatiSecundareDetailComponent } from './activitati-secundare-detail.component';

describe('ActivitatiSecundare Management Detail Component', () => {
  let comp: ActivitatiSecundareDetailComponent;
  let fixture: ComponentFixture<ActivitatiSecundareDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitatiSecundareDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ activitatiSecundare: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ActivitatiSecundareDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ActivitatiSecundareDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load activitatiSecundare on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.activitatiSecundare).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
