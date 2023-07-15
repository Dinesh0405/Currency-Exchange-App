import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { CurrencyExchangeService } from 'src/app/services/currency-exchange.service';
const TIME = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'Dec',
];

@Component({
  selector: 'app-currency-history',
  templateUrl: './currency-history.component.html',
  styleUrls: ['./currency-history.component.css'],
})
export class CurrencyHistoryComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  symbolKeys: any;
  ratesList: any=[];
  symbol= {};
  gridRateList: any=[];
  constructor(private currencyExchangeService: CurrencyExchangeService) {}

  ngOnInit(): void {
     this.fetchRateHistory();
  }
  fetchRateHistory() {
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
          this.gridRateList = this.ratesList.slice(0, 12);
          this.Chart();

        }
      });

  }


  Chart() {
    let ratevalue:any=[];
    this.gridRateList.forEach((element:any) => {
      ratevalue.push(element.value);
      
    });
    let a = ratevalue.map((y:any, i:number) => ({
      y,
      x: TIME[i],
    }));
    console.log(a);
    let options = {
      chart: {
        type: 'bar',
        heigth: '200px',
      },
      title: { text: 'Currency Exchange' },
      series: [
        {
          name: 'Rate',
          data: a,
        },
      ],
      xaxis: {
        type: 'string',
      },
      yaxis: [
        {
          title: {
            text: 'rates',
          },
        },
      ],
    };

    let chart = new ApexCharts(document.querySelector('#chart'), options);

    chart.render();
  }

  onRightClick(chart: HTMLElement, chartId: string, event?: Event) {
    console.log(event);
    console.log(chart);
    console.log(chartId);
  }
}
