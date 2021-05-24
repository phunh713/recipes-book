import { AbstractControl, FormControl } from "@angular/forms";
import { Observable } from "rxjs";

export class CustomValidators {
    static forbiddenName(control: FormControl): { [s: string]: boolean } | null {
        let forbiddenName = 'test';
        if (control.value?.toLowerCase() === forbiddenName) return { forbiddenName: true };
        return null;
    }

    static forbiddenEmail(control: AbstractControl): Promise<any> | Observable<any> {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'test@test.vn') resolve({ forbiddenEmail: true });
                resolve(null);
            }, 700);
        });

        return promise;
    }
}