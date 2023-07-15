import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConstantName } from 'src/assets/config';

@Injectable({
  providedIn: 'root',
})
export class CurrencyExchangeService {
 
  public covertAllCurrencyAmount$ = new Subject<string>();
  public covertAllCurrencyFrom$ = new Subject<string>();
  constructor(private http: HttpClient) {}
  loadContryCurrencies(): Observable<any> {
    return this.http.get(`${ConstantName.baseUrlSymbols}`);
  }

  convertCurrency(obj: any): Observable<any> {
    return this.http.get(
      `${ConstantName.baseUrlConvert}&${`from=`}${obj.from}&${`to=`}${obj.to}&${`amount=`}${
        obj.amount
      }`
    );
  }
  rates() {
    return this.http.get(`${ConstantName.baseUrlLatest}`);
  }

  convertCurreny(obj: any) {
    return (
      (obj.selectedFromCurrencyValue / obj.selectedToCurrencyValue) *
      obj.amountValue
    ).toFixed(2);
  }
}
