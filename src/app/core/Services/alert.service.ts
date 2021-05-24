import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    newAlert = new Subject<{ message: string; success: boolean }>();

    constructor() {}
}
