import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/Services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    authSub!: Subscription;
    isLogin: boolean = false;
    isRotate: boolean = false;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authSub = this.authService.userObs.subscribe(loggedInUser => {
            this.isLogin = !!loggedInUser;
        })
    }

    onLogOut() {
        this.authService.logout()
    }

    onClickNav() {
        this.isRotate = !this.isRotate
    }

    ngOnDestroy() {
        this.authSub.unsubscribe()
    }

}
