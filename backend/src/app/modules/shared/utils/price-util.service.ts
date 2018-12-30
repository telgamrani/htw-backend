import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceUtilService {

  priceWholeAndDecimalPartExpreg = new RegExp(/(\d*)(?:\.|,)*(\d*)/);

  constructor() { }

  getWholeAndDecimalPart(price) {
    let priceWholeAndDecimalPartResult = {'wholePart': '00', 'decimalPart': '00'};
    const result = this.priceWholeAndDecimalPartExpreg.exec(''+price);
    if(result) {
      priceWholeAndDecimalPartResult.wholePart = (result[1]) ? result[1] : '00';
      priceWholeAndDecimalPartResult.decimalPart = (result[2]) ? result[2] : '00';
    }
    return priceWholeAndDecimalPartResult;
  }
}
