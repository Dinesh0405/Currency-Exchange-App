import { Component, OnInit } from '@angular/core';
import { CurrencyExchangeService } from 'src/app/services/currency-exchange.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  ondetailFlag:boolean=true;
  fromCurrency: any;
  constructor(private currencyExchangeService :CurrencyExchangeService) { }

  ngOnInit(): void {
  
  }

}
