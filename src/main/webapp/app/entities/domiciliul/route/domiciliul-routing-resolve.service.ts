import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDomiciliul } from '../domiciliul.model';
import { DomiciliulService } from '../service/domiciliul.service';

@Injectable({ providedIn: 'root' })
export class DomiciliulRoutingResolveService implements Resolve<IDomiciliul | null> {
  constructor(protected service: DomiciliulService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDomiciliul | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((domiciliul: HttpResponse<IDomiciliul>) => {
          if (domiciliul.body) {
            return of(domiciliul.body);
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
