import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DateSocietateService } from '../service/date-societate.service';

import { DateSocietateComponent } from './date-societate.component';

describe('DateSocietate Management Component', () => {
  let comp: DateSocietateComponent;
  let fixture: ComponentFixture<DateSocietateComponent>;
  let service: DateSocietateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'date-societate', component: DateSocietateComponent }]), HttpClientTestingModule],
      declarations: [DateSocietateComponent],
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
      .overrideTemplate(DateSocietateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DateSocietateComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DateSocietateService);

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
    expect(comp.dateSocietates?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to dateSocietateService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getDateSocietateIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getDateSocietateIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
