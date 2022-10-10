import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDovada, NewDovada } from '../dovada.model';

export type PartialUpdateDovada = Partial<IDovada> & Pick<IDovada, 'id'>;

export type EntityResponseType = HttpResponse<IDovada>;
export type EntityArrayResponseType = HttpResponse<IDovada[]>;

@Injectable({ providedIn: 'root' })
export class DovadaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/dovadas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(dovada: NewDovada): Observable<EntityResponseType> {
    return this.http.post<IDovada>(this.resourceUrl, dovada, { observe: 'response' });
  }

  update(dovada: IDovada): Observable<EntityResponseType> {
    return this.http.put<IDovada>(`${this.resourceUrl}/${this.getDovadaIdentifier(dovada)}`, dovada, { observe: 'response' });
  }

  partialUpdate(dovada: PartialUpdateDovada): Observable<EntityResponseType> {
    return this.http.patch<IDovada>(`${this.resourceUrl}/${this.getDovadaIdentifier(dovada)}`, dovada, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDovada>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDovada[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDovadaIdentifier(dovada: Pick<IDovada, 'id'>): number {
    return dovada.id;
  }

  compareDovada(o1: Pick<IDovada, 'id'> | null, o2: Pick<IDovada, 'id'> | null): boolean {
    return o1 && o2 ? this.getDovadaIdentifier(o1) === this.getDovadaIdentifier(o2) : o1 === o2;
  }

  addDovadaToCollectionIfMissing<Type extends Pick<IDovada, 'id'>>(
    dovadaCollection: Type[],
    ...dovadasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const dovadas: Type[] = dovadasToCheck.filter(isPresent);
    if (dovadas.length > 0) {
      const dovadaCollectionIdentifiers = dovadaCollection.map(dovadaItem => this.getDovadaIdentifier(dovadaItem)!);
      const dovadasToAdd = dovadas.filter(dovadaItem => {
        const dovadaIdentifier = this.getDovadaIdentifier(dovadaItem);
        if (dovadaCollectionIdentifiers.includes(dovadaIdentifier)) {
          return false;
        }
        dovadaCollectionIdentifiers.push(dovadaIdentifier);
        return true;
      });
      return [...dovadasToAdd, ...dovadaCollection];
    }
    return dovadaCollection;
  }
}
