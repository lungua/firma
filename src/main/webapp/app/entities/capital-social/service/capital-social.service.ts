import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICapitalSocial, NewCapitalSocial } from '../capital-social.model';

export type PartialUpdateCapitalSocial = Partial<ICapitalSocial> & Pick<ICapitalSocial, 'id'>;

export type EntityResponseType = HttpResponse<ICapitalSocial>;
export type EntityArrayResponseType = HttpResponse<ICapitalSocial[]>;

@Injectable({ providedIn: 'root' })
export class CapitalSocialService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/capital-socials');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(capitalSocial: NewCapitalSocial): Observable<EntityResponseType> {
    return this.http.post<ICapitalSocial>(this.resourceUrl, capitalSocial, { observe: 'response' });
  }

  update(capitalSocial: ICapitalSocial): Observable<EntityResponseType> {
    return this.http.put<ICapitalSocial>(`${this.resourceUrl}/${this.getCapitalSocialIdentifier(capitalSocial)}`, capitalSocial, {
      observe: 'response',
    });
  }

  partialUpdate(capitalSocial: PartialUpdateCapitalSocial): Observable<EntityResponseType> {
    return this.http.patch<ICapitalSocial>(`${this.resourceUrl}/${this.getCapitalSocialIdentifier(capitalSocial)}`, capitalSocial, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICapitalSocial>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICapitalSocial[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCapitalSocialIdentifier(capitalSocial: Pick<ICapitalSocial, 'id'>): number {
    return capitalSocial.id;
  }

  compareCapitalSocial(o1: Pick<ICapitalSocial, 'id'> | null, o2: Pick<ICapitalSocial, 'id'> | null): boolean {
    return o1 && o2 ? this.getCapitalSocialIdentifier(o1) === this.getCapitalSocialIdentifier(o2) : o1 === o2;
  }

  addCapitalSocialToCollectionIfMissing<Type extends Pick<ICapitalSocial, 'id'>>(
    capitalSocialCollection: Type[],
    ...capitalSocialsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const capitalSocials: Type[] = capitalSocialsToCheck.filter(isPresent);
    if (capitalSocials.length > 0) {
      const capitalSocialCollectionIdentifiers = capitalSocialCollection.map(
        capitalSocialItem => this.getCapitalSocialIdentifier(capitalSocialItem)!
      );
      const capitalSocialsToAdd = capitalSocials.filter(capitalSocialItem => {
        const capitalSocialIdentifier = this.getCapitalSocialIdentifier(capitalSocialItem);
        if (capitalSocialCollectionIdentifiers.includes(capitalSocialIdentifier)) {
          return false;
        }
        capitalSocialCollectionIdentifiers.push(capitalSocialIdentifier);
        return true;
      });
      return [...capitalSocialsToAdd, ...capitalSocialCollection];
    }
    return capitalSocialCollection;
  }
}
