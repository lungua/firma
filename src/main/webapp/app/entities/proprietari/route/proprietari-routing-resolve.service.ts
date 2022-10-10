import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProprietari } from '../proprietari.model';
import { ProprietariService } from '../service/proprietari.service';

@Injectable({ providedIn: 'root' })
export class ProprietariRoutingResolveService implements Resolve<IProprietari | null> {
  constructor(protected service: ProprietariService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProprietari | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((proprietari: HttpResponse<IProprietari>) => {
          if (proprietari.body) {
            return of(proprietari.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
