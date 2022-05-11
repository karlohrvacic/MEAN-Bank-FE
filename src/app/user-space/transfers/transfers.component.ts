import { Component, OnInit } from '@angular/core';
import {BankService} from "../../shared/services/bank.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Subscription} from "rxjs";
import {Account} from "../../shared/models/account.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent implements OnInit {

  constructor (private bankService : BankService, private fb : FormBuilder, private toastr : ToastrService) { }

  myAccountsSubject : BehaviorSubject<Account[]> | null = null;
  allAccountsSubject : BehaviorSubject<Account[]> | null = null;
  transferForm : FormGroup = null!;
  myAccounts : Account[] = [];
  otherAccounts : Account[] = [];
  subscription : Subscription = null!;

  ngOnInit(): void {

    this.myAccountsSubject = this.bankService.getAccounts();

    this.subscription = this.myAccountsSubject
      //@ts-ignore
      .subscribe((res) => {
        this.myAccounts = res;
      });

    this.allAccountsSubject = this.bankService.getAllAccountsNumbers();

    this.subscription = this.allAccountsSubject
      //@ts-ignore
      .subscribe((res) => {
        this.otherAccounts = res;
      });

    this.transferForm = this.fb.group({
      amount : new FormControl(null, [Validators.required, Validators.min(0)]),
      senderAccountId: new FormControl(this.myAccounts[0]._id, [Validators.required]),
      receiverAccountId: new FormControl(this.allAccounts()[1]._id, [Validators.required])
    })
  }

  selectedCurrency(){
    return ' ' +  this.myAccounts.find(a => a._id == this.transferForm.value.senderAccountId)?.currency?.toUpperCase();
  }

  onSubmit(){
    if (this.transferForm.value.senderAccountId === this.transferForm.value.receiverAccountId){
      this.toastr.info('You can\'t do recursion');
    } else {
      this.bankService.addTransaction(this.transferForm.value);
    }
  }

  allAccounts(){
    if (this.otherAccounts?.length > 0){
      return this.myAccounts.concat(this.otherAccounts);
    } else return this.myAccounts;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
