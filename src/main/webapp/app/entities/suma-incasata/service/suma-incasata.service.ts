import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISumaIncasata, NewSumaIncasata } from '../suma-incasata.model';

export type PartialUpdateSumaIncasata = Partial<ISumaIncasata> & Pick<ISumaIncasata, 'id'>;

type RestOf<T extends ISumaIncasata | NewSumaIncasata> = Omit<T, 'dataIncasarii'> & {
  dataIncasarii?: string | null;
};

export type RestSumaIncasata = RestOf<ISumaIncasata>;

export type NewRestSumaIncasata = RestOf<NewSumaIncasata>;

export type PartialUpdateRestSumaIncasata = RestOf<PartialUpdateSumaIncasata>;

export type EntityResponseType = HttpResponse<ISumaIncasata>;
export type EntityArrayResponseType = HttpResponse<ISumaIncasata[]>;

@Injectable({ providedIn: 'root' })
export class SumaIncasataService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/suma-incasatas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(sumaIncasata: NewSumaIncasata): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sumaIncasata);
    return this.http
      .post<RestSumaIncasata>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(sumaIncasata: ISumaIncasata): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sumaIncasata);
    return this.http
      .put<RestSumaIncasata>(`${this.resourceUrl}/${this.getSumaIncasataIdentifier(sumaIncasata)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(sumaIncasata: PartialUpdateSumaIncasata): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sumaIncasata);
    return this.http
      .patch<RestSumaIncasata>(`${this.resourceUrl}/${this.getSumaIncasataIdentifier(sumaIncasata)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestSumaIncasata>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSumaIncasata[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSumaIncasataIdentifier(sumaIncasata: Pick<ISumaIncasata, 'id'>): number {
    return sumaIncasata.id;
  }

  compareSumaIncasata(o1: Pick<ISumaIncasata, 'id'> | null, o2: Pick<ISumaIncasata, 'id'> | null): boolean {
    return o1 && o2 ? this.getSumaIncasataIdentifier(o1) === this.getSumaIncasataIdentifier(o2) : o1 === o2;
  }

  addSumaIncasataToCollectionIfMissing<Type extends Pick<ISumaIncasata, 'id'>>(
    sumaIncasataCollection: Type[],
    ...sumaIncasatasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const sumaIncasatas: Type[] = sumaIncasatasToCheck.filter(isPresent);
    if (sumaIncasatas.length > 0) {
      const sumaIncasataCollectionIdentifiers = sumaIncasataCollection.map(
        sumaIncasataItem => this.getSumaIncasataIdentifier(sumaIncasataItem)!
      );
      const sumaIncasatasToAdd = sumaIncasatas.filter(sumaIncasataItem => {
        const sumaIncasataIdentifier = this.getSumaIncasataIdentifier(sumaIncasataItem);
        if (sumaIncasataCollectionIdentifiers.includes(sumaIncasataIdentifier)) {
          return false;
        }
        sumaIncasataCollectionIdentifiers.push(sumaIncasataIdentifier);
        return true;
      });
      return [...sumaIncasatasToAdd, ...sumaIncasataCollection];
    }
    return sumaIncasataCollection;
  }

  protected convertDateFromClient<T extends ISumaIncasata | NewSumaIncasata | PartialUpdateSumaIncasata>(sumaIncasata: T): RestOf<T> {
    return {
      ...sumaIncasata,
      dataIncasarii: sumaIncasata.dataIncasarii?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restSumaIncasata: RestSumaIncasata): ISumaIncasata {
    return {
      ...restSumaIncasata,
      dataIncasarii: restSumaIncasata.dataIncasarii ? dayjs(restSumaIncasata.dataIncasarii) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestSumaIncasata>): HttpResponse<ISumaIncasata> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestSumaIncasata[]>): HttpResponse<ISumaIncasata[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
