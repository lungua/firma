import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AdresaService } from '../service/adresa.service';

import { AdresaComponent } from './adresa.component';

describe('Adresa Management Component', () => {
  let comp: AdresaComponent;
  let fixture: ComponentFixture<AdresaComponent>;
  let service: AdresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'adresa', component: AdresaComponent }]), HttpClientTestingModule],
      declarations: [AdresaComponent],
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
      .overrideTemplate(AdresaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AdresaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AdresaService);

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
    expect(comp.adresas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to adresaService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getAdresaIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getAdresaIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
