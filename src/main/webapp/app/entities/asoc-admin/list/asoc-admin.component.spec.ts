import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AsocAdminService } from '../service/asoc-admin.service';

import { AsocAdminComponent } from './asoc-admin.component';

describe('AsocAdmin Management Component', () => {
  let comp: AsocAdminComponent;
  let fixture: ComponentFixture<AsocAdminComponent>;
  let service: AsocAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'asoc-admin', component: AsocAdminComponent }]), HttpClientTestingModule],
      declarations: [AsocAdminComponent],
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
      .overrideTemplate(AsocAdminComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AsocAdminComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AsocAdminService);

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
    expect(comp.asocAdmins?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to asocAdminService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getAsocAdminIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getAsocAdminIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
