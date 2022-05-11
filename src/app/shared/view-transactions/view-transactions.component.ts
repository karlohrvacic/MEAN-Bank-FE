import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BankService} from "../services/bank.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {Account} from "../models/account.model";
import {Payment} from "../models/payment.model";
import {Transaction} from "../models/transaction.model";
import {Location} from '@angular/common';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css']
})
export class ViewTransactionsComponent implements OnInit {

  accountId? : string;
  accountSubject : BehaviorSubject<Account[]> | null = null;
  payoutSubject : BehaviorSubject<Payment[]> | null = null;
  transactionSubject : BehaviorSubject<Transaction[]> | null = null;
  paymentSubject : BehaviorSubject<Payment[]> | null = null;
  subscription : Subscription = null!;
  accounts : Account[] = [];
  payments : Payment[] = [];
  payouts : Payment[] = [];
  transactions : Transaction[] = [];
  account? : Account;

  constructor(private route: ActivatedRoute, private router: Router, private bankService: BankService, private _location: Location) { }

  ngOnInit(): void {

    this.accountId = this.route.snapshot.params['id'];
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.accountId = params['id'];
      });

    this.payoutSubject = this.bankService.getPayouts();
    this.subscription = this.payoutSubject
      .subscribe(res => {
        this.payouts = res;
      })

    this.paymentSubject = this.bankService.getPayments();
    this.subscription = this.paymentSubject
      .subscribe(res => {
        this.payments = res;
      });

    this.accountSubject = this.bankService.getAccounts();
    this.subscription = this.accountSubject
      .subscribe((res) => {
        this.accounts = res;
        this.account = this.accounts.find(a => a._id == this.accountId);
      });

    this.transactionSubject = this.bankService.getTransactions();
    this.subscription = this.transactionSubject
      .subscribe((res) => {
        this.transactions = res;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getPayments(){
    for (let payout of this.payouts) {
      // @ts-ignore
      payout.amount = -Math.abs(payout.amount);
    }
    return this.payouts.concat(this.payments).filter(p => p.accountId == this.account?._id)
      .sort((p1, p2) => {
      // @ts-ignore
      return p2.timestamp - p1.timestamp;
    });
  }

  getTransactions() : Transaction[]{
    let result = this.transactions.filter(t => t.receiverAccountId == this.accountId || t.senderAccountId == this.accountId)
      .sort((p1, p2) => {
      // @ts-ignore
      return p2.timestamp - p1.timestamp;
    });
    if (result){
      return result;
    }
    return []
  }

  back(){
    this._location.back();
  }

  getClass(amount?: number){
    // @ts-ignore
    if (amount > 0) {
      return 'table-success'
    } else {
      return 'table-danger'
    }
  }
}
