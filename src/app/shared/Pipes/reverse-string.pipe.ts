import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'reverseString',
})
export class ReverseStringPipe implements PipeTransform {
    transform(value: string): string {
        let result: string = "";

        for (let i = value.length - 1; i >= 0; i--) {
            result += value[i]
        }

        return result;
    }
}
