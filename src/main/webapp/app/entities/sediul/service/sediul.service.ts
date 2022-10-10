import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISediul, NewSediul } from '../sediul.model';

export type PartialUpdateSediul = Partial<ISediul> & Pick<ISediul, 'id'>;

export type EntityResponseType = HttpResponse<ISediul>;
export type EntityArrayResponseType = HttpResponse<ISediul[]>;

@Injectable({ providedIn: 'root' })
export class SediulService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/sediuls');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(sediul: NewSediul): Observable<EntityResponseType> {
    return this.http.post<ISediul>(this.resourceUrl, sediul, { observe: 'response' });
  }

  update(sediul: ISediul): Observable<EntityResponseType> {
    return this.http.put<ISediul>(`${this.resourceUrl}/${this.getSediulIdentifier(sediul)}`, sediul, { observe: 'response' });
  }

  partialUpdate(sediul: PartialUpdateSediul): Observable<EntityResponseType> {
    return this.http.patch<ISediul>(`${this.resourceUrl}/${this.getSediulIdentifier(sediul)}`, sediul, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISediul>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISediul[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSediulIdentifier(sediul: Pick<ISediul, 'id'>): number {
    return sediul.id;
  }

  compareSediul(o1: Pick<ISediul, 'id'> | null, o2: Pick<ISediul, 'id'> | null): boolean {
    return o1 && o2 ? this.getSediulIdentifier(o1) === this.getSediulIdentifier(o2) : o1 === o2;
  }

  addSediulToCollectionIfMissing<Type extends Pick<ISediul, 'id'>>(
    sediulCollection: Type[],
    ...sediulsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const sediuls: Type[] = sediulsToCheck.filter(isPresent);
    if (sediuls.length > 0) {
      const sediulCollectionIdentifiers = sediulCollection.map(sediulItem => this.getSediulIdentifier(sediulItem)!);
      const sediulsToAdd = sediuls.filter(sediulItem => {
        const sediulIdentifier = this.getSediulIdentifier(sediulItem);
        if (sediulCollectionIdentifiers.includes(sediulIdentifier)) {
          return false;
        }
        sediulCollectionIdentifiers.push(sediulIdentifier);
        return true;
      });
      return [...sediulsToAdd, ...sediulCollection];
    }
    return sediulCollection;
  }
}
