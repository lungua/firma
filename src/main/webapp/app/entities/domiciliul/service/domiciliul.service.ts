import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDomiciliul, NewDomiciliul } from '../domiciliul.model';

export type PartialUpdateDomiciliul = Partial<IDomiciliul> & Pick<IDomiciliul, 'id'>;

export type EntityResponseType = HttpResponse<IDomiciliul>;
export type EntityArrayResponseType = HttpResponse<IDomiciliul[]>;

@Injectable({ providedIn: 'root' })
export class DomiciliulService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/domiciliuls');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(domiciliul: NewDomiciliul): Observable<EntityResponseType> {
    return this.http.post<IDomiciliul>(this.resourceUrl, domiciliul, { observe: 'response' });
  }

  update(domiciliul: IDomiciliul): Observable<EntityResponseType> {
    return this.http.put<IDomiciliul>(`${this.resourceUrl}/${this.getDomiciliulIdentifier(domiciliul)}`, domiciliul, {
      observe: 'response',
    });
  }

  partialUpdate(domiciliul: PartialUpdateDomiciliul): Observable<EntityResponseType> {
    return this.http.patch<IDomiciliul>(`${this.resourceUrl}/${this.getDomiciliulIdentifier(domiciliul)}`, domiciliul, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDomiciliul>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDomiciliul[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDomiciliulIdentifier(domiciliul: Pick<IDomiciliul, 'id'>): number {
    return domiciliul.id;
  }

  compareDomiciliul(o1: Pick<IDomiciliul, 'id'> | null, o2: Pick<IDomiciliul, 'id'> | null): boolean {
    return o1 && o2 ? this.getDomiciliulIdentifier(o1) === this.getDomiciliulIdentifier(o2) : o1 === o2;
  }

  addDomiciliulToCollectionIfMissing<Type extends Pick<IDomiciliul, 'id'>>(
    domiciliulCollection: Type[],
    ...domiciliulsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const domiciliuls: Type[] = domiciliulsToCheck.filter(isPresent);
    if (domiciliuls.length > 0) {
      const domiciliulCollectionIdentifiers = domiciliulCollection.map(domiciliulItem => this.getDomiciliulIdentifier(domiciliulItem)!);
      const domiciliulsToAdd = domiciliuls.filter(domiciliulItem => {
        const domiciliulIdentifier = this.getDomiciliulIdentifier(domiciliulItem);
        if (domiciliulCollectionIdentifiers.includes(domiciliulIdentifier)) {
          return false;
        }
        domiciliulCollectionIdentifiers.push(domiciliulIdentifier);
        return true;
      });
      return [...domiciliulsToAdd, ...domiciliulCollection];
    }
    return domiciliulCollection;
  }
}
