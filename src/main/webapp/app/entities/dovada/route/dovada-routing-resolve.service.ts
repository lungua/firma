import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDovada } from '../dovada.model';
import { DovadaService } from '../service/dovada.service';

@Injectable({ providedIn: 'root' })
export class DovadaRoutingResolveService implements Resolve<IDovada | null> {
  constructor(protected service: DovadaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDovada | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((dovada: HttpResponse<IDovada>) => {
          if (dovada.body) {
            return of(dovada.body);
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
