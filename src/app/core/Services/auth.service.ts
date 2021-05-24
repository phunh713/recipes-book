import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../model/user.model';
import { AlertService } from './alert.service';
import { DataService } from './data.service';

export interface AuthDataResponse {
    displayName?: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    userObs = new BehaviorSubject<User | null>(null);
    autoLogoutTimeout!: any;
    // userObs = new Subject<User>();

    constructor(private http: HttpClient, private dataService: DataService, private router: Router, private route: ActivatedRoute, private alertService: AlertService) {}

    signUp(email: string, password: string) {
        return this.http
            .post<AuthDataResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJmRRDaSgtMDZ6KPNH5raMgpuT4OksKDE', {
                email,
                password,
                returnSecureToken: true,
            })
            .pipe(
                catchError(this.errorHandling.bind(this))
                // tap((resData) => {
                //     this.authResHandling(resData.email, resData.localId, resData.idToken, resData.expiresIn);
                // })
            );
    }

    logIn(email: string, password: string) {
        return this.http
            .post<AuthDataResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJmRRDaSgtMDZ6KPNH5raMgpuT4OksKDE', {
                email,
                password,
                returnSecureToken: true,
            })
            .pipe(
                catchError(this.errorHandling.bind(this)),
                tap((resData) => {
                    this.authResHandling(resData.email, resData.localId, resData.idToken, resData.expiresIn);
                })
            );
    }

    autoLogin() {
        let localData = localStorage.getItem('userData');
        let userData!: { email: string; id: string; _token: string; _tokenExpireDate: string };

        if (localData) userData = JSON.parse(localData); //parse if localStorage has 'userData' key

        if (!userData) return;

        let loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpireDate));

        if (loadedUser.token) {
            this.userObs.next(loadedUser);
            let timeLeft = new Date(userData._tokenExpireDate).getTime() - new Date().getTime();
            this.autoLogOut(timeLeft);
        }
    }

    logout() {
        this.alertService.newAlert.next({message:"Your Are Logged Out", success: false})
        this.userObs.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
        clearTimeout(this.autoLogoutTimeout);
    }

    autoLogOut(durationUntilExpire: number) {
        this.autoLogoutTimeout = setTimeout(() => {
            this.logout();
        }, durationUntilExpire);
    }

    private errorHandling(errorMes: HttpErrorResponse | null) {
        let error = '';
        switch (errorMes?.error.error.message) {
            case 'INVALID_PASSWORD':
                error = 'Email or Password is incorrect';
                break;

            case 'EMAIL_EXISTS':
                error = 'Email has aldready exists';
                break;

            case 'EMAIL_NOT_FOUND':
                error = 'Email or Password is incorrect';
                break;

            default:
                error = 'An Error Occured';
                break;
        }
        

        this.alertService.newAlert.next({message: error, success: false})
        return throwError(error);
    }

    private authResHandling(email: string, localId: string, idToken: string, expireIn: string) {
        let expireDate = new Date(new Date().getTime() + Number(expireIn) * 1000);
        let user = new User(email, localId, idToken, expireDate);
        this.userObs.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.autoLogOut(+expireIn * 1000);

        this.alertService.newAlert.next({message: "You are successfully logged In", success: true})
    }
}
