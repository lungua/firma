import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAsocAdmin } from '../asoc-admin.model';
import { AsocAdminService } from '../service/asoc-admin.service';

@Injectable({ providedIn: 'root' })
export class AsocAdminRoutingResolveService implements Resolve<IAsocAdmin | null> {
  constructor(protected service: AsocAdminService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAsocAdmin | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((asocAdmin: HttpResponse<IAsocAdmin>) => {
          if (asocAdmin.body) {
            return of(asocAdmin.body);
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
