import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DomiciliulService } from '../service/domiciliul.service';

import { DomiciliulComponent } from './domiciliul.component';

describe('Domiciliul Management Component', () => {
  let comp: DomiciliulComponent;
  let fixture: ComponentFixture<DomiciliulComponent>;
  let service: DomiciliulService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'domiciliul', component: DomiciliulComponent }]), HttpClientTestingModule],
      declarations: [DomiciliulComponent],
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
      .overrideTemplate(DomiciliulComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DomiciliulComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DomiciliulService);

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
    expect(comp.domiciliuls?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to domiciliulService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getDomiciliulIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getDomiciliulIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
