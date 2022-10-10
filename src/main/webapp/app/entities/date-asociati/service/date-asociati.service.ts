import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDateAsociati, NewDateAsociati } from '../date-asociati.model';

export type PartialUpdateDateAsociati = Partial<IDateAsociati> & Pick<IDateAsociati, 'id'>;

export type EntityResponseType = HttpResponse<IDateAsociati>;
export type EntityArrayResponseType = HttpResponse<IDateAsociati[]>;

@Injectable({ providedIn: 'root' })
export class DateAsociatiService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/date-asociatis');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(dateAsociati: NewDateAsociati): Observable<EntityResponseType> {
    return this.http.post<IDateAsociati>(this.resourceUrl, dateAsociati, { observe: 'response' });
  }

  update(dateAsociati: IDateAsociati): Observable<EntityResponseType> {
    return this.http.put<IDateAsociati>(`${this.resourceUrl}/${this.getDateAsociatiIdentifier(dateAsociati)}`, dateAsociati, {
      observe: 'response',
    });
  }

  partialUpdate(dateAsociati: PartialUpdateDateAsociati): Observable<EntityResponseType> {
    return this.http.patch<IDateAsociati>(`${this.resourceUrl}/${this.getDateAsociatiIdentifier(dateAsociati)}`, dateAsociati, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDateAsociati>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDateAsociati[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDateAsociatiIdentifier(dateAsociati: Pick<IDateAsociati, 'id'>): number {
    return dateAsociati.id;
  }

  compareDateAsociati(o1: Pick<IDateAsociati, 'id'> | null, o2: Pick<IDateAsociati, 'id'> | null): boolean {
    return o1 && o2 ? this.getDateAsociatiIdentifier(o1) === this.getDateAsociatiIdentifier(o2) : o1 === o2;
  }

  addDateAsociatiToCollectionIfMissing<Type extends Pick<IDateAsociati, 'id'>>(
    dateAsociatiCollection: Type[],
    ...dateAsociatisToCheck: (Type | null | undefined)[]
  ): Type[] {
    const dateAsociatis: Type[] = dateAsociatisToCheck.filter(isPresent);
    if (dateAsociatis.length > 0) {
      const dateAsociatiCollectionIdentifiers = dateAsociatiCollection.map(
        dateAsociatiItem => this.getDateAsociatiIdentifier(dateAsociatiItem)!
      );
      const dateAsociatisToAdd = dateAsociatis.filter(dateAsociatiItem => {
        const dateAsociatiIdentifier = this.getDateAsociatiIdentifier(dateAsociatiItem);
        if (dateAsociatiCollectionIdentifiers.includes(dateAsociatiIdentifier)) {
          return false;
        }
        dateAsociatiCollectionIdentifiers.push(dateAsociatiIdentifier);
        return true;
      });
      return [...dateAsociatisToAdd, ...dateAsociatiCollection];
    }
    return dateAsociatiCollection;
  }
}
