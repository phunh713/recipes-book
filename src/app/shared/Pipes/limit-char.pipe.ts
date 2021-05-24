import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitChar'
})
export class LimitCharPipe implements PipeTransform {

  transform(value: string, limit: number): unknown {
      if (limit > value.length) return value
      let newString = value.substr(0, limit);
      if (newString[newString.length-1] !== " ") {
          newString = newString.substr(0, newString.lastIndexOf(" ")) + ' ...'
      } else {
          newString += ' ...'
      }
    return newString;
  }

}
