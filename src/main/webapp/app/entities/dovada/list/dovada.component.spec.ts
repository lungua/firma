import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DovadaService } from '../service/dovada.service';

import { DovadaComponent } from './dovada.component';

describe('Dovada Management Component', () => {
  let comp: DovadaComponent;
  let fixture: ComponentFixture<DovadaComponent>;
  let service: DovadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'dovada', component: DovadaComponent }]), HttpClientTestingModule],
      declarations: [DovadaComponent],
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
      .overrideTemplate(DovadaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DovadaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DovadaService);

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
    expect(comp.dovadas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to dovadaService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getDovadaIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getDovadaIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
