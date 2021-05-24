import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private alertService: AlertService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean> | boolean {
        return this.authService.userObs.pipe(
            map((user) => {
                if (user) {
                    return !!user;
                } else {
                    console.log('no more user')
                    this.alertService.newAlert.next({message:"Please Log In to View Content", success: false})
                    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}})
                    return false
                }
            })
        );
    }
}
