import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BankService} from "./services/bank.service";
import {MoneyOrCurrencyPipe} from "./money-or-currency.pipe";

@NgModule({
  declarations: [
    MoneyOrCurrencyPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MoneyOrCurrencyPipe
  ],
  providers: [BankService]

})
export class SharedModule { }
