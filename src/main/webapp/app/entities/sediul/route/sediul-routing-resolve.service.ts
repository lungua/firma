import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISediul } from '../sediul.model';
import { SediulService } from '../service/sediul.service';

@Injectable({ providedIn: 'root' })
export class SediulRoutingResolveService implements Resolve<ISediul | null> {
  constructor(protected service: SediulService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISediul | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((sediul: HttpResponse<ISediul>) => {
          if (sediul.body) {
            return of(sediul.body);
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
