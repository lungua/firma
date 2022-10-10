import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDateSocietate, NewDateSocietate } from '../date-societate.model';

export type PartialUpdateDateSocietate = Partial<IDateSocietate> & Pick<IDateSocietate, 'id'>;

export type EntityResponseType = HttpResponse<IDateSocietate>;
export type EntityArrayResponseType = HttpResponse<IDateSocietate[]>;

@Injectable({ providedIn: 'root' })
export class DateSocietateService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/date-societates');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(dateSocietate: NewDateSocietate): Observable<EntityResponseType> {
    return this.http.post<IDateSocietate>(this.resourceUrl, dateSocietate, { observe: 'response' });
  }

  update(dateSocietate: IDateSocietate): Observable<EntityResponseType> {
    return this.http.put<IDateSocietate>(`${this.resourceUrl}/${this.getDateSocietateIdentifier(dateSocietate)}`, dateSocietate, {
      observe: 'response',
    });
  }

  partialUpdate(dateSocietate: PartialUpdateDateSocietate): Observable<EntityResponseType> {
    return this.http.patch<IDateSocietate>(`${this.resourceUrl}/${this.getDateSocietateIdentifier(dateSocietate)}`, dateSocietate, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDateSocietate>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDateSocietate[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDateSocietateIdentifier(dateSocietate: Pick<IDateSocietate, 'id'>): number {
    return dateSocietate.id;
  }

  compareDateSocietate(o1: Pick<IDateSocietate, 'id'> | null, o2: Pick<IDateSocietate, 'id'> | null): boolean {
    return o1 && o2 ? this.getDateSocietateIdentifier(o1) === this.getDateSocietateIdentifier(o2) : o1 === o2;
  }

  addDateSocietateToCollectionIfMissing<Type extends Pick<IDateSocietate, 'id'>>(
    dateSocietateCollection: Type[],
    ...dateSocietatesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const dateSocietates: Type[] = dateSocietatesToCheck.filter(isPresent);
    if (dateSocietates.length > 0) {
      const dateSocietateCollectionIdentifiers = dateSocietateCollection.map(
        dateSocietateItem => this.getDateSocietateIdentifier(dateSocietateItem)!
      );
      const dateSocietatesToAdd = dateSocietates.filter(dateSocietateItem => {
        const dateSocietateIdentifier = this.getDateSocietateIdentifier(dateSocietateItem);
        if (dateSocietateCollectionIdentifiers.includes(dateSocietateIdentifier)) {
          return false;
        }
        dateSocietateCollectionIdentifiers.push(dateSocietateIdentifier);
        return true;
      });
      return [...dateSocietatesToAdd, ...dateSocietateCollection];
    }
    return dateSocietateCollection;
  }
}
