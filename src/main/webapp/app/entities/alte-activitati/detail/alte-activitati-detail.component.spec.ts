import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AlteActivitatiDetailComponent } from './alte-activitati-detail.component';

describe('AlteActivitati Management Detail Component', () => {
  let comp: AlteActivitatiDetailComponent;
  let fixture: ComponentFixture<AlteActivitatiDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlteActivitatiDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ alteActivitati: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AlteActivitatiDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AlteActivitatiDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load alteActivitati on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.alteActivitati).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
