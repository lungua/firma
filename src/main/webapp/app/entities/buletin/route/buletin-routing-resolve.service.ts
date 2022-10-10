import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBuletin } from '../buletin.model';
import { BuletinService } from '../service/buletin.service';

@Injectable({ providedIn: 'root' })
export class BuletinRoutingResolveService implements Resolve<IBuletin | null> {
  constructor(protected service: BuletinService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBuletin | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((buletin: HttpResponse<IBuletin>) => {
          if (buletin.body) {
            return of(buletin.body);
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
