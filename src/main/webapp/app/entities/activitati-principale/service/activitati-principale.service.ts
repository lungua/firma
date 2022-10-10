import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IActivitatiPrincipale, NewActivitatiPrincipale } from '../activitati-principale.model';

export type PartialUpdateActivitatiPrincipale = Partial<IActivitatiPrincipale> & Pick<IActivitatiPrincipale, 'id'>;

export type EntityResponseType = HttpResponse<IActivitatiPrincipale>;
export type EntityArrayResponseType = HttpResponse<IActivitatiPrincipale[]>;

@Injectable({ providedIn: 'root' })
export class ActivitatiPrincipaleService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/activitati-principales');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(activitatiPrincipale: NewActivitatiPrincipale): Observable<EntityResponseType> {
    return this.http.post<IActivitatiPrincipale>(this.resourceUrl, activitatiPrincipale, { observe: 'response' });
  }

  update(activitatiPrincipale: IActivitatiPrincipale): Observable<EntityResponseType> {
    return this.http.put<IActivitatiPrincipale>(
      `${this.resourceUrl}/${this.getActivitatiPrincipaleIdentifier(activitatiPrincipale)}`,
      activitatiPrincipale,
      { observe: 'response' }
    );
  }

  partialUpdate(activitatiPrincipale: PartialUpdateActivitatiPrincipale): Observable<EntityResponseType> {
    return this.http.patch<IActivitatiPrincipale>(
      `${this.resourceUrl}/${this.getActivitatiPrincipaleIdentifier(activitatiPrincipale)}`,
      activitatiPrincipale,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IActivitatiPrincipale>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IActivitatiPrincipale[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getActivitatiPrincipaleIdentifier(activitatiPrincipale: Pick<IActivitatiPrincipale, 'id'>): number {
    return activitatiPrincipale.id;
  }

  compareActivitatiPrincipale(o1: Pick<IActivitatiPrincipale, 'id'> | null, o2: Pick<IActivitatiPrincipale, 'id'> | null): boolean {
    return o1 && o2 ? this.getActivitatiPrincipaleIdentifier(o1) === this.getActivitatiPrincipaleIdentifier(o2) : o1 === o2;
  }

  addActivitatiPrincipaleToCollectionIfMissing<Type extends Pick<IActivitatiPrincipale, 'id'>>(
    activitatiPrincipaleCollection: Type[],
    ...activitatiPrincipalesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const activitatiPrincipales: Type[] = activitatiPrincipalesToCheck.filter(isPresent);
    if (activitatiPrincipales.length > 0) {
      const activitatiPrincipaleCollectionIdentifiers = activitatiPrincipaleCollection.map(
        activitatiPrincipaleItem => this.getActivitatiPrincipaleIdentifier(activitatiPrincipaleItem)!
      );
      const activitatiPrincipalesToAdd = activitatiPrincipales.filter(activitatiPrincipaleItem => {
        const activitatiPrincipaleIdentifier = this.getActivitatiPrincipaleIdentifier(activitatiPrincipaleItem);
        if (activitatiPrincipaleCollectionIdentifiers.includes(activitatiPrincipaleIdentifier)) {
          return false;
        }
        activitatiPrincipaleCollectionIdentifiers.push(activitatiPrincipaleIdentifier);
        return true;
      });
      return [...activitatiPrincipalesToAdd, ...activitatiPrincipaleCollection];
    }
    return activitatiPrincipaleCollection;
  }
}
