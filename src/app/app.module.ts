import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ConversionPanelComponent } from './components/conversion-panel/conversion-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyGridComponent } from './components/currency-grid/currency-grid.component';
import { AppRoutingModule } from './app-routing.module';
import { DetailsComponent } from './components/details/details.component';
import { CurrencyHistoryComponent } from './components/currency-history/currency-history.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConversionPanelComponent,
    CurrencyGridComponent,
    DetailsComponent,
    CurrencyHistoryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
