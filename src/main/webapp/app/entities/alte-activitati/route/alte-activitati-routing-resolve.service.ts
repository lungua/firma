import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAlteActivitati } from '../alte-activitati.model';
import { AlteActivitatiService } from '../service/alte-activitati.service';

@Injectable({ providedIn: 'root' })
export class AlteActivitatiRoutingResolveService implements Resolve<IAlteActivitati | null> {
  constructor(protected service: AlteActivitatiService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAlteActivitati | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((alteActivitati: HttpResponse<IAlteActivitati>) => {
          if (alteActivitati.body) {
            return of(alteActivitati.body);
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
