import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class IsSubmittedGuard implements CanActivate {
  constructor(private backendService: BackendService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean | UrlTree>(subscriber => {
      this.backendService.currentState.subscribe(data => {
        subscriber.next(data.isSubmitted ? data.isSubmitted : this.router.parseUrl("/"));
      });
    });
  }

}
