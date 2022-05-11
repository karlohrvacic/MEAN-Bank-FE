import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {BankService} from "../../shared/services/bank.service";
import {User} from "../../shared/models/user.model";
import {Account} from "../../shared/models/account.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  usersSubject : BehaviorSubject<User[]> | null = null;
  subscription : Subscription = null!;
  users : User[] = [];
  accounts : Account[] = [];
  accountSubject : BehaviorSubject<Account[]> | null = null;

  constructor(private accountService: BankService, private toastr : ToastrService) { }

  ngOnInit(): void {

    this.usersSubject = this.accountService.getUsers();

    this.subscription = this.usersSubject
      .subscribe((res) => {
        this.users = res;
      });

    this.accountSubject = this.accountService.getAccounts();

    this.subscription = this.accountSubject
      .subscribe((res) => {
        this.accounts = res;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getUserAccounts(userId : string){
    return this.accounts.filter(a => a.ownerId == userId);
  }

  deleteUser(id: any){
    this.accountService.deleteUser(id);
  }

}
