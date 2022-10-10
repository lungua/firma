import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IActivitatiPrincipale } from '../activitati-principale.model';
import { ActivitatiPrincipaleService } from '../service/activitati-principale.service';

@Injectable({ providedIn: 'root' })
export class ActivitatiPrincipaleRoutingResolveService implements Resolve<IActivitatiPrincipale | null> {
  constructor(protected service: ActivitatiPrincipaleService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IActivitatiPrincipale | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((activitatiPrincipale: HttpResponse<IActivitatiPrincipale>) => {
          if (activitatiPrincipale.body) {
            return of(activitatiPrincipale.body);
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
