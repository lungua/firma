import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ActivitatiPrincipaleDetailComponent } from './activitati-principale-detail.component';

describe('ActivitatiPrincipale Management Detail Component', () => {
  let comp: ActivitatiPrincipaleDetailComponent;
  let fixture: ComponentFixture<ActivitatiPrincipaleDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitatiPrincipaleDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ activitatiPrincipale: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ActivitatiPrincipaleDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ActivitatiPrincipaleDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load activitatiPrincipale on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.activitatiPrincipale).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
