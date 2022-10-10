import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IActivitatiSecundare } from '../activitati-secundare.model';
import { ActivitatiSecundareService } from '../service/activitati-secundare.service';

@Injectable({ providedIn: 'root' })
export class ActivitatiSecundareRoutingResolveService implements Resolve<IActivitatiSecundare | null> {
  constructor(protected service: ActivitatiSecundareService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IActivitatiSecundare | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((activitatiSecundare: HttpResponse<IActivitatiSecundare>) => {
          if (activitatiSecundare.body) {
            return of(activitatiSecundare.body);
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
