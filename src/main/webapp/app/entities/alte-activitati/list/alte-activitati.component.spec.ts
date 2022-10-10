import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AlteActivitatiService } from '../service/alte-activitati.service';

import { AlteActivitatiComponent } from './alte-activitati.component';

describe('AlteActivitati Management Component', () => {
  let comp: AlteActivitatiComponent;
  let fixture: ComponentFixture<AlteActivitatiComponent>;
  let service: AlteActivitatiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'alte-activitati', component: AlteActivitatiComponent }]), HttpClientTestingModule],
      declarations: [AlteActivitatiComponent],
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
      .overrideTemplate(AlteActivitatiComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AlteActivitatiComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AlteActivitatiService);

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
    expect(comp.alteActivitatis?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to alteActivitatiService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getAlteActivitatiIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getAlteActivitatiIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
