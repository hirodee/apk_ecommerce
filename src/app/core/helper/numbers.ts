import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Numbers {

  public currency = (x:any) => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  }
  
  public numbering(nums:any) {
    if (typeof(nums)!=='undefined') {
      return nums.toString().split(' ').join('').split('.').join('').split(',').join('.');
    } else {
      return 0;
    }
  }

  generatePhoneNumber(strNumber:string) {
    strNumber = strNumber.split("-").join("");
    strNumber = strNumber.split(" ").join("");
    if (strNumber[0]=="+" && strNumber[1]=="6" && strNumber[2]=="2") {
      strNumber = strNumber.replace("+62", "");
    }
    if (strNumber[0]=="6" && strNumber[1]=="2") {
      strNumber = strNumber.replace("62", "");
    }
    if (strNumber[0]=="0") {
      strNumber = strNumber.replace("0", "");
    }
    return "0"+strNumber;
  }

}