import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DateAsociatiService } from '../service/date-asociati.service';

import { DateAsociatiComponent } from './date-asociati.component';

describe('DateAsociati Management Component', () => {
  let comp: DateAsociatiComponent;
  let fixture: ComponentFixture<DateAsociatiComponent>;
  let service: DateAsociatiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'date-asociati', component: DateAsociatiComponent }]), HttpClientTestingModule],
      declarations: [DateAsociatiComponent],
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
      .overrideTemplate(DateAsociatiComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DateAsociatiComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DateAsociatiService);

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
    expect(comp.dateAsociatis?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to dateAsociatiService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getDateAsociatiIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getDateAsociatiIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
