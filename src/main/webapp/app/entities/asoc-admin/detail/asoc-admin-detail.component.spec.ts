import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AsocAdminDetailComponent } from './asoc-admin-detail.component';

describe('AsocAdmin Management Detail Component', () => {
  let comp: AsocAdminDetailComponent;
  let fixture: ComponentFixture<AsocAdminDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsocAdminDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ asocAdmin: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AsocAdminDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AsocAdminDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load asocAdmin on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.asocAdmin).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
