import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numToArray',
})
export class NumToArrayPipe implements PipeTransform {
    transform(number: number): Array<any> {
        let result = [];
        for (let i = 0; i < number; i++) {
            result.push(i);
        }
        return result;
    }
}
