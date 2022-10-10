import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDateAsociati } from '../date-asociati.model';
import { DateAsociatiService } from '../service/date-asociati.service';

@Injectable({ providedIn: 'root' })
export class DateAsociatiRoutingResolveService implements Resolve<IDateAsociati | null> {
  constructor(protected service: DateAsociatiService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDateAsociati | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((dateAsociati: HttpResponse<IDateAsociati>) => {
          if (dateAsociati.body) {
            return of(dateAsociati.body);
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
