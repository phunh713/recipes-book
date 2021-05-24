import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthDataResponse, AuthService } from '../core/Services/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
    isLogin: boolean = true;
    isLoading: boolean = false;
    errorMessage: string = '';

    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

    ngOnInit(): void {
        
            (this.router.url.indexOf('login') !== -1) ? (this.isLogin = true) : (this.isLogin = false);
        
    }

    onSubmit(form: NgForm) {
        this.errorMessage = '';
        let authObs: Observable<AuthDataResponse>;
        this.isLoading = true;

        if (form.invalid) return;

        if (this.isLogin) {
            authObs = this.authService.logIn(form.value.email, form.value.password).pipe(
                tap(() => {
                    let returnUrl = '';

                    if (this.route.snapshot.queryParams['returnUrl']) {
                        returnUrl = this.route.snapshot.queryParams['returnUrl'];

                        this.router.navigateByUrl(returnUrl);
                    } else {
                        this.router.navigate(['/recipes']);
                    }
                })
            );
        } else {
            authObs = this.authService.signUp(form.value.email, form.value.password);
        }

        authObs.subscribe(
            (data) => {
            this.isLoading = false;
            },
            (error) => {
                console.log(error);
                this.isLoading = false;
            }
        );
    }
}
