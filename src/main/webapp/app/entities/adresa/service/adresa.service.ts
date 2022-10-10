import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAdresa, NewAdresa } from '../adresa.model';

export type PartialUpdateAdresa = Partial<IAdresa> & Pick<IAdresa, 'id'>;

export type EntityResponseType = HttpResponse<IAdresa>;
export type EntityArrayResponseType = HttpResponse<IAdresa[]>;

@Injectable({ providedIn: 'root' })
export class AdresaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/adresas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(adresa: NewAdresa): Observable<EntityResponseType> {
    return this.http.post<IAdresa>(this.resourceUrl, adresa, { observe: 'response' });
  }

  update(adresa: IAdresa): Observable<EntityResponseType> {
    return this.http.put<IAdresa>(`${this.resourceUrl}/${this.getAdresaIdentifier(adresa)}`, adresa, { observe: 'response' });
  }

  partialUpdate(adresa: PartialUpdateAdresa): Observable<EntityResponseType> {
    return this.http.patch<IAdresa>(`${this.resourceUrl}/${this.getAdresaIdentifier(adresa)}`, adresa, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAdresa>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAdresa[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAdresaIdentifier(adresa: Pick<IAdresa, 'id'>): number {
    return adresa.id;
  }

  compareAdresa(o1: Pick<IAdresa, 'id'> | null, o2: Pick<IAdresa, 'id'> | null): boolean {
    return o1 && o2 ? this.getAdresaIdentifier(o1) === this.getAdresaIdentifier(o2) : o1 === o2;
  }

  addAdresaToCollectionIfMissing<Type extends Pick<IAdresa, 'id'>>(
    adresaCollection: Type[],
    ...adresasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const adresas: Type[] = adresasToCheck.filter(isPresent);
    if (adresas.length > 0) {
      const adresaCollectionIdentifiers = adresaCollection.map(adresaItem => this.getAdresaIdentifier(adresaItem)!);
      const adresasToAdd = adresas.filter(adresaItem => {
        const adresaIdentifier = this.getAdresaIdentifier(adresaItem);
        if (adresaCollectionIdentifiers.includes(adresaIdentifier)) {
          return false;
        }
        adresaCollectionIdentifiers.push(adresaIdentifier);
        return true;
      });
      return [...adresasToAdd, ...adresaCollection];
    }
    return adresaCollection;
  }
}
