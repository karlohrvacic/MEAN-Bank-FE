import { Pipe, PipeTransform } from '@angular/core';
import {Account} from "./models/account.model";

@Pipe({
  name: 'moneyOrCurrency'
})
export class MoneyOrCurrencyPipe implements PipeTransform {

  transform(account: Account): string {
    let string = '';
    if (account.balance){
      string += 'Balance: ' + account.balance.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ';
    }
    string += account.currency?.toUpperCase();
    return string;
  }

}
