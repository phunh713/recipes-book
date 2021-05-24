import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValidators } from './custom-validators';

@Component({
    selector: 'app-form-reactive',
    templateUrl: './form-reactive.component.html',
    styleUrls: ['./form-reactive.component.scss'],
})
export class FormReactiveComponent implements OnInit {
    projectForm!: FormGroup;
    picArray!: FormArray;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.projectForm = this.formBuilder.group({
            name: ['name', [Validators.required, CustomValidators.forbiddenName]],
            email: ['email@test.vn', [Validators.required, Validators.email], CustomValidators.forbiddenEmail],
            status: ['critical', [Validators.required]],
            checkbox: [null],
            pic: this.formBuilder.array([this.formBuilder.control('phu', [Validators.required])]),
        });

        this.picArray = this.projectForm.get('pic') as FormArray;

    }

    onSubmit(form: HTMLFormElement) {
        console.log(form.querySelector('#flexCheckDefault'));
        console.log(this.projectForm.get('checkbox'));
    }

    onAddPic() {
        let newControl = this.formBuilder.control(null, [Validators.required]);
        this.picArray.push(newControl);
    }
}
