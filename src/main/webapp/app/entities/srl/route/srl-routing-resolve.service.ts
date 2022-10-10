import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISrl } from '../srl.model';
import { SrlService } from '../service/srl.service';

@Injectable({ providedIn: 'root' })
export class SrlRoutingResolveService implements Resolve<ISrl | null> {
  constructor(protected service: SrlService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISrl | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((srl: HttpResponse<ISrl>) => {
          if (srl.body) {
            return of(srl.body);
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
