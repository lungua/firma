import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { SumaIncasataService } from '../service/suma-incasata.service';

import { SumaIncasataComponent } from './suma-incasata.component';

describe('SumaIncasata Management Component', () => {
  let comp: SumaIncasataComponent;
  let fixture: ComponentFixture<SumaIncasataComponent>;
  let service: SumaIncasataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'suma-incasata', component: SumaIncasataComponent }]), HttpClientTestingModule],
      declarations: [SumaIncasataComponent],
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
      .overrideTemplate(SumaIncasataComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SumaIncasataComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SumaIncasataService);

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
    expect(comp.sumaIncasatas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to sumaIncasataService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getSumaIncasataIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getSumaIncasataIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
