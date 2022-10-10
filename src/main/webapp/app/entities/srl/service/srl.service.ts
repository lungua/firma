import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISrl, NewSrl } from '../srl.model';

export type PartialUpdateSrl = Partial<ISrl> & Pick<ISrl, 'id'>;

type RestOf<T extends ISrl | NewSrl> = Omit<T, 'dataInregistrare'> & {
  dataInregistrare?: string | null;
};

export type RestSrl = RestOf<ISrl>;

export type NewRestSrl = RestOf<NewSrl>;

export type PartialUpdateRestSrl = RestOf<PartialUpdateSrl>;

export type EntityResponseType = HttpResponse<ISrl>;
export type EntityArrayResponseType = HttpResponse<ISrl[]>;

@Injectable({ providedIn: 'root' })
export class SrlService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/srls');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(srl: NewSrl): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(srl);
    return this.http.post<RestSrl>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(srl: ISrl): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(srl);
    return this.http
      .put<RestSrl>(`${this.resourceUrl}/${this.getSrlIdentifier(srl)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(srl: PartialUpdateSrl): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(srl);
    return this.http
      .patch<RestSrl>(`${this.resourceUrl}/${this.getSrlIdentifier(srl)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestSrl>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSrl[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSrlIdentifier(srl: Pick<ISrl, 'id'>): number {
    return srl.id;
  }

  compareSrl(o1: Pick<ISrl, 'id'> | null, o2: Pick<ISrl, 'id'> | null): boolean {
    return o1 && o2 ? this.getSrlIdentifier(o1) === this.getSrlIdentifier(o2) : o1 === o2;
  }

  addSrlToCollectionIfMissing<Type extends Pick<ISrl, 'id'>>(srlCollection: Type[], ...srlsToCheck: (Type | null | undefined)[]): Type[] {
    const srls: Type[] = srlsToCheck.filter(isPresent);
    if (srls.length > 0) {
      const srlCollectionIdentifiers = srlCollection.map(srlItem => this.getSrlIdentifier(srlItem)!);
      const srlsToAdd = srls.filter(srlItem => {
        const srlIdentifier = this.getSrlIdentifier(srlItem);
        if (srlCollectionIdentifiers.includes(srlIdentifier)) {
          return false;
        }
        srlCollectionIdentifiers.push(srlIdentifier);
        return true;
      });
      return [...srlsToAdd, ...srlCollection];
    }
    return srlCollection;
  }

  protected convertDateFromClient<T extends ISrl | NewSrl | PartialUpdateSrl>(srl: T): RestOf<T> {
    return {
      ...srl,
      dataInregistrare: srl.dataInregistrare?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restSrl: RestSrl): ISrl {
    return {
      ...restSrl,
      dataInregistrare: restSrl.dataInregistrare ? dayjs(restSrl.dataInregistrare) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestSrl>): HttpResponse<ISrl> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestSrl[]>): HttpResponse<ISrl[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
