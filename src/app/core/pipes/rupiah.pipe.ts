import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupiah'
})
export class RupiahPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var result = (value * 1).toFixed(0);
    var snum = result.split(".");
    var fnum = "";
    for (let i = 0; i < snum[0].length; i++) {
      if ((snum[0].length - i) % 3 == 0) {
        if (i != 0) {
          fnum += '.';
        }
      }
      fnum += snum[0].charAt(i);
    }
    var rnum = fnum;
    return rnum;
  }

}
