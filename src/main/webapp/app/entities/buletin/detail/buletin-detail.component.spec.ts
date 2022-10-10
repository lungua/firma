import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BuletinDetailComponent } from './buletin-detail.component';

describe('Buletin Management Detail Component', () => {
  let comp: BuletinDetailComponent;
  let fixture: ComponentFixture<BuletinDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuletinDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ buletin: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(BuletinDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(BuletinDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load buletin on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.buletin).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
