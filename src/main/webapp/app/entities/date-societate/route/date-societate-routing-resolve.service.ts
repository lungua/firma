import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDateSocietate } from '../date-societate.model';
import { DateSocietateService } from '../service/date-societate.service';

@Injectable({ providedIn: 'root' })
export class DateSocietateRoutingResolveService implements Resolve<IDateSocietate | null> {
  constructor(protected service: DateSocietateService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDateSocietate | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((dateSocietate: HttpResponse<IDateSocietate>) => {
          if (dateSocietate.body) {
            return of(dateSocietate.body);
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
