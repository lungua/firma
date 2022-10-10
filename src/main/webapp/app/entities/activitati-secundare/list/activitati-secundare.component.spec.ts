import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ActivitatiSecundareService } from '../service/activitati-secundare.service';

import { ActivitatiSecundareComponent } from './activitati-secundare.component';

describe('ActivitatiSecundare Management Component', () => {
  let comp: ActivitatiSecundareComponent;
  let fixture: ComponentFixture<ActivitatiSecundareComponent>;
  let service: ActivitatiSecundareService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'activitati-secundare', component: ActivitatiSecundareComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [ActivitatiSecundareComponent],
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
      .overrideTemplate(ActivitatiSecundareComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ActivitatiSecundareComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ActivitatiSecundareService);

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
    expect(comp.activitatiSecundares?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to activitatiSecundareService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getActivitatiSecundareIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getActivitatiSecundareIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
