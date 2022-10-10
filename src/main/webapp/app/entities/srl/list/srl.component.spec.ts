import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { SrlService } from '../service/srl.service';

import { SrlComponent } from './srl.component';

describe('Srl Management Component', () => {
  let comp: SrlComponent;
  let fixture: ComponentFixture<SrlComponent>;
  let service: SrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'srl', component: SrlComponent }]), HttpClientTestingModule],
      declarations: [SrlComponent],
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
      .overrideTemplate(SrlComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SrlComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SrlService);

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
    expect(comp.srls?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to srlService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getSrlIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getSrlIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
