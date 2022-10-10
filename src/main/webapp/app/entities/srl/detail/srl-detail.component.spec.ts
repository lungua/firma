import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SrlDetailComponent } from './srl-detail.component';

describe('Srl Management Detail Component', () => {
  let comp: SrlDetailComponent;
  let fixture: ComponentFixture<SrlDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SrlDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ srl: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SrlDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SrlDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load srl on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.srl).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
