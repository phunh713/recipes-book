import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { exhaustMap, switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return this.authService.userObs.pipe(
            take(1),
            switchMap((user) => {
                if (user && user.token && request.url.indexOf("https://angular-udemy-project-dd66c-default-rtdb.firebaseio.com") !== -1) {
                    let modifiedReq = request.clone({
                        params: new HttpParams().set('auth', user.token),
                    });
                    return next.handle(modifiedReq);
                } else {
                    return next.handle(request);
                }
            })
        );
    }
}
