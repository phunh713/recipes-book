import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './core/Services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authService.autoLogin();
    }
}
