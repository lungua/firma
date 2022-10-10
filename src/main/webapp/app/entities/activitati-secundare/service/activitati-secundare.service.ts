import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IActivitatiSecundare, NewActivitatiSecundare } from '../activitati-secundare.model';

export type PartialUpdateActivitatiSecundare = Partial<IActivitatiSecundare> & Pick<IActivitatiSecundare, 'id'>;

export type EntityResponseType = HttpResponse<IActivitatiSecundare>;
export type EntityArrayResponseType = HttpResponse<IActivitatiSecundare[]>;

@Injectable({ providedIn: 'root' })
export class ActivitatiSecundareService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/activitati-secundares');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(activitatiSecundare: NewActivitatiSecundare): Observable<EntityResponseType> {
    return this.http.post<IActivitatiSecundare>(this.resourceUrl, activitatiSecundare, { observe: 'response' });
  }

  update(activitatiSecundare: IActivitatiSecundare): Observable<EntityResponseType> {
    return this.http.put<IActivitatiSecundare>(
      `${this.resourceUrl}/${this.getActivitatiSecundareIdentifier(activitatiSecundare)}`,
      activitatiSecundare,
      { observe: 'response' }
    );
  }

  partialUpdate(activitatiSecundare: PartialUpdateActivitatiSecundare): Observable<EntityResponseType> {
    return this.http.patch<IActivitatiSecundare>(
      `${this.resourceUrl}/${this.getActivitatiSecundareIdentifier(activitatiSecundare)}`,
      activitatiSecundare,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IActivitatiSecundare>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IActivitatiSecundare[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getActivitatiSecundareIdentifier(activitatiSecundare: Pick<IActivitatiSecundare, 'id'>): number {
    return activitatiSecundare.id;
  }

  compareActivitatiSecundare(o1: Pick<IActivitatiSecundare, 'id'> | null, o2: Pick<IActivitatiSecundare, 'id'> | null): boolean {
    return o1 && o2 ? this.getActivitatiSecundareIdentifier(o1) === this.getActivitatiSecundareIdentifier(o2) : o1 === o2;
  }

  addActivitatiSecundareToCollectionIfMissing<Type extends Pick<IActivitatiSecundare, 'id'>>(
    activitatiSecundareCollection: Type[],
    ...activitatiSecundaresToCheck: (Type | null | undefined)[]
  ): Type[] {
    const activitatiSecundares: Type[] = activitatiSecundaresToCheck.filter(isPresent);
    if (activitatiSecundares.length > 0) {
      const activitatiSecundareCollectionIdentifiers = activitatiSecundareCollection.map(
        activitatiSecundareItem => this.getActivitatiSecundareIdentifier(activitatiSecundareItem)!
      );
      const activitatiSecundaresToAdd = activitatiSecundares.filter(activitatiSecundareItem => {
        const activitatiSecundareIdentifier = this.getActivitatiSecundareIdentifier(activitatiSecundareItem);
        if (activitatiSecundareCollectionIdentifiers.includes(activitatiSecundareIdentifier)) {
          return false;
        }
        activitatiSecundareCollectionIdentifiers.push(activitatiSecundareIdentifier);
        return true;
      });
      return [...activitatiSecundaresToAdd, ...activitatiSecundareCollection];
    }
    return activitatiSecundareCollection;
  }
}
