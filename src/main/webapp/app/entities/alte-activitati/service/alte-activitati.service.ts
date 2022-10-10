import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAlteActivitati, NewAlteActivitati } from '../alte-activitati.model';

export type PartialUpdateAlteActivitati = Partial<IAlteActivitati> & Pick<IAlteActivitati, 'id'>;

export type EntityResponseType = HttpResponse<IAlteActivitati>;
export type EntityArrayResponseType = HttpResponse<IAlteActivitati[]>;

@Injectable({ providedIn: 'root' })
export class AlteActivitatiService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/alte-activitatis');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(alteActivitati: NewAlteActivitati): Observable<EntityResponseType> {
    return this.http.post<IAlteActivitati>(this.resourceUrl, alteActivitati, { observe: 'response' });
  }

  update(alteActivitati: IAlteActivitati): Observable<EntityResponseType> {
    return this.http.put<IAlteActivitati>(`${this.resourceUrl}/${this.getAlteActivitatiIdentifier(alteActivitati)}`, alteActivitati, {
      observe: 'response',
    });
  }

  partialUpdate(alteActivitati: PartialUpdateAlteActivitati): Observable<EntityResponseType> {
    return this.http.patch<IAlteActivitati>(`${this.resourceUrl}/${this.getAlteActivitatiIdentifier(alteActivitati)}`, alteActivitati, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAlteActivitati>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAlteActivitati[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAlteActivitatiIdentifier(alteActivitati: Pick<IAlteActivitati, 'id'>): number {
    return alteActivitati.id;
  }

  compareAlteActivitati(o1: Pick<IAlteActivitati, 'id'> | null, o2: Pick<IAlteActivitati, 'id'> | null): boolean {
    return o1 && o2 ? this.getAlteActivitatiIdentifier(o1) === this.getAlteActivitatiIdentifier(o2) : o1 === o2;
  }

  addAlteActivitatiToCollectionIfMissing<Type extends Pick<IAlteActivitati, 'id'>>(
    alteActivitatiCollection: Type[],
    ...alteActivitatisToCheck: (Type | null | undefined)[]
  ): Type[] {
    const alteActivitatis: Type[] = alteActivitatisToCheck.filter(isPresent);
    if (alteActivitatis.length > 0) {
      const alteActivitatiCollectionIdentifiers = alteActivitatiCollection.map(
        alteActivitatiItem => this.getAlteActivitatiIdentifier(alteActivitatiItem)!
      );
      const alteActivitatisToAdd = alteActivitatis.filter(alteActivitatiItem => {
        const alteActivitatiIdentifier = this.getAlteActivitatiIdentifier(alteActivitatiItem);
        if (alteActivitatiCollectionIdentifiers.includes(alteActivitatiIdentifier)) {
          return false;
        }
        alteActivitatiCollectionIdentifiers.push(alteActivitatiIdentifier);
        return true;
      });
      return [...alteActivitatisToAdd, ...alteActivitatiCollection];
    }
    return alteActivitatiCollection;
  }
}
