import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-form-td',
    templateUrl: './form-td.component.html',
    styleUrls: ['./form-td.component.scss'],
})
export class FormTdComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('form', { static: false }) form!: NgForm;
    formValueChangeSub: Subscription | undefined;
    isInputing: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    ngAfterViewInit() {
        this.formValueChangeSub = this.form?.valueChanges?.subscribe(() => {
            this.isInputing = true
        });
        this.isInputing = false;
    }

    onSubmit() {
        console.log(this.form);
        this.isInputing = false;
    }

    ngOnDestroy() {
        this.formValueChangeSub?.unsubscribe();
    }
}
