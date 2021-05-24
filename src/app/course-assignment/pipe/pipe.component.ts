import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pipe',
    templateUrl: './pipe.component.html',
    styleUrls: ['./pipe.component.scss'],
})
export class PipeComponent implements OnInit {
    today = Date.now();
    random: number = 0;
    myString: string = 'my hero';

    constructor() {}

    ngOnInit(): void {
        setInterval(() => {
            this.today = Date.now();
            this.random = Math.random() * 10000;
        }, 1000);
    }
}
