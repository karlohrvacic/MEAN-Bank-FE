import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BankService} from "../../shared/services/bank.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {Account} from "../../shared/models/account.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.css']
})
export class UserAccountsComponent implements OnInit {

  userId? : string;
  subscription : Subscription = null!;
  accounts : Account[] = [];
  accountSubject : BehaviorSubject<Account[]> | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private bankService: BankService, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['accId'];
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.userId = params['accId'];
      });

    this.accountSubject = this.bankService.getAccounts();
    this.subscription = this.accountSubject
      .subscribe((res) => {
        this.accounts = res;
      });

  }

  getAccounts(){
    return this.accounts.filter(a => a.ownerId == this.userId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  back(){
    this.router.navigate(['']);
  }

  deleteAccount(id : string){
    this.bankService.deleteAccount(id);
  }

}
