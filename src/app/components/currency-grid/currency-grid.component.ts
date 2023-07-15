import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CurrencyExchangeService } from 'src/app/services/currency-exchange.service';

@Component({
  selector: 'app-currency-grid',
  templateUrl: './currency-grid.component.html',
  styleUrls: ['./currency-grid.component.css'],
})
export class CurrencyGridComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  ratesList: any = [];
  symbolKeys: any = [];
  symbol: any;
  amount: string = '';
  from: string = '';
  gridRateList: any;
  constructor(private currencyExchangeService: CurrencyExchangeService) {}

  ngOnInit(): void {
    this.currencyExchangeService.covertAllCurrencyAmount$.subscribe((res) => {
      this.amount = res;
    });
    this.currencyExchangeService.covertAllCurrencyFrom$.subscribe((res) => {
      this.from = res;
    });

    this.rateListAll();
  }

  rateListAll() {
    this.currencyExchangeService
      .rates()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if(res.success){

        let symbol = res['rates'];
        let symbolKeys = Object.keys(symbol);
        symbolKeys.forEach((element: any, i: number) => {
          this.ratesList.push({
            key: symbolKeys[i],
            value: symbol[symbolKeys[i]],
          });
        });
        this.gridRateList = this.ratesList.slice(0, 9);
      }
      });
      
  }
}
