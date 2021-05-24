import { animate, animateChild, query, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/Services/alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    animations: [
        trigger('alertShowParent', [
            transition(':enter', [animate(0), query('@alertShow', animateChild())]),
            transition(':leave', [animate(0), query('@alertShow', animateChild())]),
        ]),
        trigger('alertShow', [
            transition(':enter', [style({ transform: 'translateX(100%)', opacity: 0 }), animate('0.3s ease-out')]),
            transition(':leave', [animate('0.3s ease-out', style({ transform: 'translateX(100%)', opacity: 0 }))]),
        ]),
    ],
})
export class AlertComponent implements OnInit {
    array: { id: number; message: string; success: boolean }[] = [];
    id: number = 0;
    isShow: boolean = false;
    constructor(private alertService: AlertService) {}

    ngOnInit(): void {
        this.alertService.newAlert.subscribe((data) => {
            this.isShow = true;
            this.array.unshift({ id: this.id, ...data });
            let justAddId = this.id;
            this.id++;

            setTimeout(() => {
                let index = this.array.findIndex((item) => justAddId === item.id);
                if (index !== -1) {
                    this.array.splice(index, 1);
                }

                if (this.array.length === 0) this.isShow = false;
            }, 3000);
        });
    }

    onClose(id: number) {
        this.array.splice(
            this.array.findIndex((item) => id === item.id),
            1
        );
    }
}
