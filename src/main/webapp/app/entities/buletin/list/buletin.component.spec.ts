import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { BuletinService } from '../service/buletin.service';

import { BuletinComponent } from './buletin.component';

describe('Buletin Management Component', () => {
  let comp: BuletinComponent;
  let fixture: ComponentFixture<BuletinComponent>;
  let service: BuletinService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'buletin', component: BuletinComponent }]), HttpClientTestingModule],
      declarations: [BuletinComponent],
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
      .overrideTemplate(BuletinComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BuletinComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(BuletinService);

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
    expect(comp.buletins?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to buletinService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getBuletinIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getBuletinIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
