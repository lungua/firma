import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SediulDetailComponent } from './sediul-detail.component';

describe('Sediul Management Detail Component', () => {
  let comp: SediulDetailComponent;
  let fixture: ComponentFixture<SediulDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SediulDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ sediul: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SediulDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SediulDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load sediul on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.sediul).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
