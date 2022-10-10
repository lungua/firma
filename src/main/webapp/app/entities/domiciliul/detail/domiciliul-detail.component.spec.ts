import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DomiciliulDetailComponent } from './domiciliul-detail.component';

describe('Domiciliul Management Detail Component', () => {
  let comp: DomiciliulDetailComponent;
  let fixture: ComponentFixture<DomiciliulDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DomiciliulDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ domiciliul: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DomiciliulDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DomiciliulDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load domiciliul on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.domiciliul).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
