import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CapitalSocialService } from '../service/capital-social.service';

import { CapitalSocialComponent } from './capital-social.component';

describe('CapitalSocial Management Component', () => {
  let comp: CapitalSocialComponent;
  let fixture: ComponentFixture<CapitalSocialComponent>;
  let service: CapitalSocialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'capital-social', component: CapitalSocialComponent }]), HttpClientTestingModule],
      declarations: [CapitalSocialComponent],
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
      .overrideTemplate(CapitalSocialComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CapitalSocialComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CapitalSocialService);

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
    expect(comp.capitalSocials?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to capitalSocialService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getCapitalSocialIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getCapitalSocialIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
