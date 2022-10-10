import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAsocAdmin, NewAsocAdmin } from '../asoc-admin.model';

export type PartialUpdateAsocAdmin = Partial<IAsocAdmin> & Pick<IAsocAdmin, 'id'>;

export type EntityResponseType = HttpResponse<IAsocAdmin>;
export type EntityArrayResponseType = HttpResponse<IAsocAdmin[]>;

@Injectable({ providedIn: 'root' })
export class AsocAdminService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/asoc-admins');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(asocAdmin: NewAsocAdmin): Observable<EntityResponseType> {
    return this.http.post<IAsocAdmin>(this.resourceUrl, asocAdmin, { observe: 'response' });
  }

  update(asocAdmin: IAsocAdmin): Observable<EntityResponseType> {
    return this.http.put<IAsocAdmin>(`${this.resourceUrl}/${this.getAsocAdminIdentifier(asocAdmin)}`, asocAdmin, { observe: 'response' });
  }

  partialUpdate(asocAdmin: PartialUpdateAsocAdmin): Observable<EntityResponseType> {
    return this.http.patch<IAsocAdmin>(`${this.resourceUrl}/${this.getAsocAdminIdentifier(asocAdmin)}`, asocAdmin, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAsocAdmin>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAsocAdmin[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAsocAdminIdentifier(asocAdmin: Pick<IAsocAdmin, 'id'>): number {
    return asocAdmin.id;
  }

  compareAsocAdmin(o1: Pick<IAsocAdmin, 'id'> | null, o2: Pick<IAsocAdmin, 'id'> | null): boolean {
    return o1 && o2 ? this.getAsocAdminIdentifier(o1) === this.getAsocAdminIdentifier(o2) : o1 === o2;
  }

  addAsocAdminToCollectionIfMissing<Type extends Pick<IAsocAdmin, 'id'>>(
    asocAdminCollection: Type[],
    ...asocAdminsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const asocAdmins: Type[] = asocAdminsToCheck.filter(isPresent);
    if (asocAdmins.length > 0) {
      const asocAdminCollectionIdentifiers = asocAdminCollection.map(asocAdminItem => this.getAsocAdminIdentifier(asocAdminItem)!);
      const asocAdminsToAdd = asocAdmins.filter(asocAdminItem => {
        const asocAdminIdentifier = this.getAsocAdminIdentifier(asocAdminItem);
        if (asocAdminCollectionIdentifiers.includes(asocAdminIdentifier)) {
          return false;
        }
        asocAdminCollectionIdentifiers.push(asocAdminIdentifier);
        return true;
      });
      return [...asocAdminsToAdd, ...asocAdminCollection];
    }
    return asocAdminCollection;
  }
}
