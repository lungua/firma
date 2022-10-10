import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProprietariDetailComponent } from './proprietari-detail.component';

describe('Proprietari Management Detail Component', () => {
  let comp: ProprietariDetailComponent;
  let fixture: ComponentFixture<ProprietariDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProprietariDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ proprietari: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ProprietariDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ProprietariDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load proprietari on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.proprietari).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
