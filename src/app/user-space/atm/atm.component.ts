import { Component, OnInit } from '@angular/core';
import {BankService} from "../../shared/services/bank.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Account} from "../../shared/models/account.model";
import {BehaviorSubject, Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-atm',
  templateUrl: './atm.component.html',
  styleUrls: ['./atm.component.css']
})
export class AtmComponent implements OnInit {

  constructor (private bankService : BankService, private fb : FormBuilder, private toastr : ToastrService) { }

  accountSubject : BehaviorSubject<Account[]> | null = null;
  atmForm : FormGroup = null!;
  accounts : Account[] = [];
  subscription : Subscription = null!;

  availableCurrencies : string[]  = ['currencies'];
  isPayoutActive : boolean = false;
  defaultPick : string = 'payment';
  currencies : String[] = []
  currenciesNames : String[] = []
  currenciesSubject : BehaviorSubject<String[]> | null = null;
  currenciesNameSubject : BehaviorSubject<String[]> | null = null;

  ngOnInit(): void {

    this.currenciesNameSubject = this.bankService.getCurrenciesNames();
    this.subscription = this.currenciesNameSubject
      //@ts-ignore
      .subscribe((res) => {
        this.currenciesNames = res;
      });

    this.currenciesSubject = this.bankService.getCurrencies();
    this.subscription = this.currenciesSubject
      //@ts-ignore
      .subscribe((res) => {
        this.currencies = res;
      });


    this.accountSubject = this.bankService.getAccounts();
    this.subscription = this.accountSubject
      //@ts-ignore
      .subscribe((res) => {
        this.accounts = res;
      });

    this.atmForm = this.fb.group({
      amount : new FormControl(null, [Validators.required, Validators.min(0)]),
      action: new FormControl(null, [Validators.required]),
      accountId: new FormControl(this.accounts[0]._id, [Validators.required])
    })
  }

  isPayout(isIt : boolean){
    if (isIt){
      this.atmForm.addControl('currency', new FormControl(this.accounts.find(a => a._id == this.atmForm.value.accountId)?.currency));
      this.isPayoutActive = true;
    } else {
      this.atmForm.removeControl('currency');
      this.isPayoutActive = false;
    }
  }

  selectedCurrency(){
    return ' ' +  this.accounts.find(a => a._id == this.atmForm.value.accountId)?.currency?.toUpperCase();
  }

  onSubmit(){
    this.atmForm.removeControl('action');
    this.atmForm.value.amount = this.atmForm.value.amount.toFixed(2);
    if (this.atmForm.value.amount == 0){
      this.toastr.error('You have entered invalid amount!');
    } else {
      if (!this.isPayoutActive){
        this.bankService.addPayment(this.atmForm.value);
      } else {
        // @ts-ignore
        if (this.atmForm.value.amount > this.accounts.find(a => a._id == this.atmForm.value.accountId).balance){
          this.toastr.error('Entered amount is greater than your available balance');
        } else {
          this.bankService.addPayout(this.atmForm.value);
        }
      }
    }

    this.atmForm.addControl('action', new FormControl(this.isPayoutActive ? 'payout' : 'payment', [Validators.required]));

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
