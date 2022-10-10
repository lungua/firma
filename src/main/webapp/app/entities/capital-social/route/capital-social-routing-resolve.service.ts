import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICapitalSocial } from '../capital-social.model';
import { CapitalSocialService } from '../service/capital-social.service';

@Injectable({ providedIn: 'root' })
export class CapitalSocialRoutingResolveService implements Resolve<ICapitalSocial | null> {
  constructor(protected service: CapitalSocialService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICapitalSocial | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((capitalSocial: HttpResponse<ICapitalSocial>) => {
          if (capitalSocial.body) {
            return of(capitalSocial.body);
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
