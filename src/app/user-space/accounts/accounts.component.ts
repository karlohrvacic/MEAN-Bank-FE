import { Component, OnInit } from '@angular/core';
import {BankService} from "../../shared/services/bank.service";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/models/user.model";
import {BehaviorSubject, Subscription} from "rxjs";
import {Account} from "../../shared/models/account.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  user : User = null!;
  subscription : Subscription = null!;
  accounts : Account[] = [];
  accountSubject : BehaviorSubject<Account[]> | null = null;
  addingAccount : boolean = false;

  constructor(private accountService: BankService, private auth : AuthService, private toastr : ToastrService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.user = this.auth.getUser();
    this.accountSubject = this.accountService.getAccounts();

    this.subscription = this.accountSubject
      .subscribe((res) => {
        this.accounts = res;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClose(){
    this.addingAccount = false;
  }

  deleteAccount(id: any){
    this.accountService.deleteAccount(id);
  }

}
