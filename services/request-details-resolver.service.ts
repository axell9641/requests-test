import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { RequestService } from './request.service';
import { RequestResponse } from '../models/request.response.model';

@Injectable({
  providedIn: 'root'
})

export class RequestDetailsResolverService {

  constructor(private requestService: RequestService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RequestResponse> | Observable<never> {
    const id = route.paramMap.get('id');

    return this.requestService.findById(id).pipe(
      mergeMap((response: RequestResponse) => {
        if (response) {
          return of(response);
        } else {
          this.router.navigate(['/admin']);
          return EMPTY;
        }
      })
    );
  }
}
