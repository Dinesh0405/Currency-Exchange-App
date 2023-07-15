import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CurrencyExchangeService } from 'src/app/services/currency-exchange.service';
import { CurrencyList } from './conversion-panel.type';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-conversion-panel',
  templateUrl: './conversion-panel.component.html',
  styleUrls: ['./conversion-panel.component.css'],
})
export class ConversionPanelComponent implements OnInit {
  public currencyCovertInputUSD: any;
  public currencyCovertInput: any;
  amountValue: any;
  isDisabled: boolean = true;
  rate = {};
  rates = [];
  rateKeys = [];
  symbol: any = {};
  symbols: any = [];
  symbolKeys: any = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  currencyList: CurrencyList[] = [];
  selectedFromCurrency: any;
  selectedToCurrency: any;
  ratesList: any = [];
  selectedFromCurrencyValue: any = 1;
  selectedToCurrencyValue: any;
  defaultSelectedCurrency: any;
@Input() ondetailFlag:any;
@Input() fromCurrency:any;
currencyName:any;
  constructor(private currencyExchangeService: CurrencyExchangeService) {}

  ngOnInit(): void {
    this.loadContriesList();
    this.ratesValues();
  }

  onAmtChange(value: number) {
    value != null ? (this.isDisabled = false) : (this.isDisabled = true);
  }
  loadContriesList() {
    this.currencyExchangeService
      .loadContryCurrencies()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if(res.success){
        this.symbol = res['symbols'];
        this.symbolKeys = Object.keys(this.symbol);
        this.symbolKeys.forEach((element: any, i: number) => {
          this.currencyList.push({
            key: this.symbolKeys[i],
            value: this.symbol[this.symbolKeys[i]],
          });
          this.selectedFromCurrency = 'EUR';
          this.selectedToCurrency = 'USD';
        });
      }
      });

  }

  convertCurreny() {
    // let obj={
    //   from:this.selectedFromCurrencyValue
    // }
    if(this.selectedFromCurrencyValue !=null &&  this.selectedToCurrencyValue !=null){
    this.currencyCovertInputUSD = (
      (this.selectedFromCurrencyValue / this.selectedToCurrencyValue) *
      this.amountValue
    ).toFixed(2);
    this.currencyExchangeService.covertAllCurrencyAmount$.next(
      this.amountValue
    );
    this.currencyExchangeService.covertAllCurrencyFrom$.next(
      this.selectedFromCurrencyValue
    );
    }
  }
  onChange(event: any) {
    let fromvalue = this.ratesList.filter((res: any) => res.key === event);
    this.selectedFromCurrencyValue = fromvalue[0].value;
  
  }
  changeToCurrency(event: any) {
    let tovalue = this.ratesList.filter((res: any) => res.key === event);
    this.selectedToCurrencyValue = tovalue[0].value;
  }
  ratesValues() {
    this.currencyExchangeService
      .rates()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if(res.success){
          let symbol = res['rates'];
        let symbolKeys = Object.keys(this.symbol);
        this.symbolKeys.forEach((element: any, i: number) => {
          this.ratesList.push({
            key: symbolKeys[i],
            value: symbol[this.symbolKeys[i]],
          });
        });
        const rate = this.ratesList.filter(
          (res: any) => res.key === this.selectedToCurrency
        );
        this.defaultSelectedCurrency = `${rate[0]?.value}`;
        this.currencyCovertInput = `${rate[0]?.value} ${rate[0]?.key}`;
        this.selectedToCurrencyValue = this.defaultSelectedCurrency;
        }
      });
  }
}
