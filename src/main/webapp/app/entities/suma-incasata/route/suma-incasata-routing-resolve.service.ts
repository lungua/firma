import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISumaIncasata } from '../suma-incasata.model';
import { SumaIncasataService } from '../service/suma-incasata.service';

@Injectable({ providedIn: 'root' })
export class SumaIncasataRoutingResolveService implements Resolve<ISumaIncasata | null> {
  constructor(protected service: SumaIncasataService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISumaIncasata | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((sumaIncasata: HttpResponse<ISumaIncasata>) => {
          if (sumaIncasata.body) {
            return of(sumaIncasata.body);
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
