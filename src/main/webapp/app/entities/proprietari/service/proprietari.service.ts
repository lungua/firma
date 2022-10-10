import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProprietari, NewProprietari } from '../proprietari.model';

export type PartialUpdateProprietari = Partial<IProprietari> & Pick<IProprietari, 'id'>;

export type EntityResponseType = HttpResponse<IProprietari>;
export type EntityArrayResponseType = HttpResponse<IProprietari[]>;

@Injectable({ providedIn: 'root' })
export class ProprietariService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/proprietaris');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(proprietari: NewProprietari): Observable<EntityResponseType> {
    return this.http.post<IProprietari>(this.resourceUrl, proprietari, { observe: 'response' });
  }

  update(proprietari: IProprietari): Observable<EntityResponseType> {
    return this.http.put<IProprietari>(`${this.resourceUrl}/${this.getProprietariIdentifier(proprietari)}`, proprietari, {
      observe: 'response',
    });
  }

  partialUpdate(proprietari: PartialUpdateProprietari): Observable<EntityResponseType> {
    return this.http.patch<IProprietari>(`${this.resourceUrl}/${this.getProprietariIdentifier(proprietari)}`, proprietari, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProprietari>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProprietari[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getProprietariIdentifier(proprietari: Pick<IProprietari, 'id'>): number {
    return proprietari.id;
  }

  compareProprietari(o1: Pick<IProprietari, 'id'> | null, o2: Pick<IProprietari, 'id'> | null): boolean {
    return o1 && o2 ? this.getProprietariIdentifier(o1) === this.getProprietariIdentifier(o2) : o1 === o2;
  }

  addProprietariToCollectionIfMissing<Type extends Pick<IProprietari, 'id'>>(
    proprietariCollection: Type[],
    ...proprietarisToCheck: (Type | null | undefined)[]
  ): Type[] {
    const proprietaris: Type[] = proprietarisToCheck.filter(isPresent);
    if (proprietaris.length > 0) {
      const proprietariCollectionIdentifiers = proprietariCollection.map(
        proprietariItem => this.getProprietariIdentifier(proprietariItem)!
      );
      const proprietarisToAdd = proprietaris.filter(proprietariItem => {
        const proprietariIdentifier = this.getProprietariIdentifier(proprietariItem);
        if (proprietariCollectionIdentifiers.includes(proprietariIdentifier)) {
          return false;
        }
        proprietariCollectionIdentifiers.push(proprietariIdentifier);
        return true;
      });
      return [...proprietarisToAdd, ...proprietariCollection];
    }
    return proprietariCollection;
  }
}
