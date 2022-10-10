import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CapitalSocialDetailComponent } from './capital-social-detail.component';

describe('CapitalSocial Management Detail Component', () => {
  let comp: CapitalSocialDetailComponent;
  let fixture: ComponentFixture<CapitalSocialDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapitalSocialDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ capitalSocial: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CapitalSocialDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CapitalSocialDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load capitalSocial on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.capitalSocial).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
