import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ProprietariService } from '../service/proprietari.service';

import { ProprietariComponent } from './proprietari.component';

describe('Proprietari Management Component', () => {
  let comp: ProprietariComponent;
  let fixture: ComponentFixture<ProprietariComponent>;
  let service: ProprietariService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'proprietari', component: ProprietariComponent }]), HttpClientTestingModule],
      declarations: [ProprietariComponent],
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
      .overrideTemplate(ProprietariComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProprietariComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ProprietariService);

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
    expect(comp.proprietaris?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to proprietariService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getProprietariIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getProprietariIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
