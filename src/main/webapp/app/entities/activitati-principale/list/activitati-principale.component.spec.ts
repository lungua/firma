import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ActivitatiPrincipaleService } from '../service/activitati-principale.service';

import { ActivitatiPrincipaleComponent } from './activitati-principale.component';

describe('ActivitatiPrincipale Management Component', () => {
  let comp: ActivitatiPrincipaleComponent;
  let fixture: ComponentFixture<ActivitatiPrincipaleComponent>;
  let service: ActivitatiPrincipaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'activitati-principale', component: ActivitatiPrincipaleComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [ActivitatiPrincipaleComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(ActivitatiPrincipaleComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ActivitatiPrincipaleComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ActivitatiPrincipaleService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.activitatiPrincipales?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to activitatiPrincipaleService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getActivitatiPrincipaleIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getActivitatiPrincipaleIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
