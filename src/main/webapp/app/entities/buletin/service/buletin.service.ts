import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBuletin, NewBuletin } from '../buletin.model';

export type PartialUpdateBuletin = Partial<IBuletin> & Pick<IBuletin, 'id'>;

type RestOf<T extends IBuletin | NewBuletin> = Omit<T, 'data'> & {
  data?: string | null;
};

export type RestBuletin = RestOf<IBuletin>;

export type NewRestBuletin = RestOf<NewBuletin>;

export type PartialUpdateRestBuletin = RestOf<PartialUpdateBuletin>;

export type EntityResponseType = HttpResponse<IBuletin>;
export type EntityArrayResponseType = HttpResponse<IBuletin[]>;

@Injectable({ providedIn: 'root' })
export class BuletinService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/buletins');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(buletin: NewBuletin): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(buletin);
    return this.http
      .post<RestBuletin>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(buletin: IBuletin): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(buletin);
    return this.http
      .put<RestBuletin>(`${this.resourceUrl}/${this.getBuletinIdentifier(buletin)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(buletin: PartialUpdateBuletin): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(buletin);
    return this.http
      .patch<RestBuletin>(`${this.resourceUrl}/${this.getBuletinIdentifier(buletin)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestBuletin>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestBuletin[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getBuletinIdentifier(buletin: Pick<IBuletin, 'id'>): number {
    return buletin.id;
  }

  compareBuletin(o1: Pick<IBuletin, 'id'> | null, o2: Pick<IBuletin, 'id'> | null): boolean {
    return o1 && o2 ? this.getBuletinIdentifier(o1) === this.getBuletinIdentifier(o2) : o1 === o2;
  }

  addBuletinToCollectionIfMissing<Type extends Pick<IBuletin, 'id'>>(
    buletinCollection: Type[],
    ...buletinsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const buletins: Type[] = buletinsToCheck.filter(isPresent);
    if (buletins.length > 0) {
      const buletinCollectionIdentifiers = buletinCollection.map(buletinItem => this.getBuletinIdentifier(buletinItem)!);
      const buletinsToAdd = buletins.filter(buletinItem => {
        const buletinIdentifier = this.getBuletinIdentifier(buletinItem);
        if (buletinCollectionIdentifiers.includes(buletinIdentifier)) {
          return false;
        }
        buletinCollectionIdentifiers.push(buletinIdentifier);
        return true;
      });
      return [...buletinsToAdd, ...buletinCollection];
    }
    return buletinCollection;
  }

  protected convertDateFromClient<T extends IBuletin | NewBuletin | PartialUpdateBuletin>(buletin: T): RestOf<T> {
    return {
      ...buletin,
      data: buletin.data?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restBuletin: RestBuletin): IBuletin {
    return {
      ...restBuletin,
      data: restBuletin.data ? dayjs(restBuletin.data) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestBuletin>): HttpResponse<IBuletin> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestBuletin[]>): HttpResponse<IBuletin[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
