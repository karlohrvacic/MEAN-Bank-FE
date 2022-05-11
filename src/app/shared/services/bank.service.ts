import {Injectable, OnInit} from '@angular/core';
import {Account} from "../models/account.model";
import {BehaviorSubject, Subject, Subscription} from "rxjs";
import {DataService} from "./data.service";
import {AuthService} from "./auth.service";
import {Payment} from "../models/payment.model";
import {Transaction} from "../models/transaction.model";
import {User} from "../models/user.model";
import {ToastrService} from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class BankService {

  accounts : Account[] = null!;
  accountsNumbers : Account[] = null!;
  payments : Payment[] = null!;
  payouts : Payment[] = null!;
  currencies : String[] = null!;
  currenciesNames : String[] = null!;
  users : User[] = null!;

  transactions : Transaction[] = null!;
  // @ts-ignore
  accountSubject : BehaviorSubject<Account[]> = new BehaviorSubject(null);
  // @ts-ignore
  usersSubject : BehaviorSubject<User[]> = new BehaviorSubject(null);
  // @ts-ignore
  accountNumbersSubject : BehaviorSubject<Account[]> = new BehaviorSubject(null);
  // @ts-ignore
  paymentSubject : BehaviorSubject<Payment[]> = new BehaviorSubject(null);
  // @ts-ignore
  payoutSubject : BehaviorSubject<Payment[]> = new BehaviorSubject(null);
  // @ts-ignore
  transactionSubject : BehaviorSubject<Transaction[]> = new BehaviorSubject(null);
  // @ts-ignore
  currenciesSubject : BehaviorSubject<String[]> = new BehaviorSubject(null);
  // @ts-ignore
  currenciesNameSubject : BehaviorSubject<String[]> = new BehaviorSubject(null);

  authChange: Subject<boolean> = new Subject<boolean>();
  authChangeSubscription : Subscription | undefined;

  constructor(private dataService : DataService, private authService : AuthService, private toastr : ToastrService) {
    this.init();
    this.subscribe();
  }

  init() {
    this.initAccounts();
    this.initPayments();
    this.initPayouts();
    this.initTransactions();
    this.initCurrencies();

    if (this.authService.getUser()?.level == 1){
      this.initUsers();
    }
  }

  subscribe(){
    this.authChangeSubscription = this.authService.authChange
      .subscribe(authenticated => {
        if (authenticated) {
          this.init();
        } else {
          this.destroyData();
        }
      });
  }

  destroyData(){
    // @ts-ignore
    this.accountSubject.next(null);
    // @ts-ignore
    this.usersSubject.next(null);
    // @ts-ignore
    this.accountNumbersSubject.next(null);
    // @ts-ignore
    this.paymentSubject.next(null);
    // @ts-ignore
    this.payoutSubject.next(null);
    // @ts-ignore
    this.transactionSubject.next(null);
  }

  initAccounts(){
    // @ts-ignore
    this.dataService.getAccounts(this.authService.getUser().level)
      //@ts-ignore
      .subscribe((res: {
        status?: number,
        body: {
          accounts?: Account[],
        }
      }) => {
        if (res.body.accounts) {
          this.initCurrencies();
          this.accounts = res.body.accounts;
          this.accountSubject.next([...this.accounts]);
          this.initAccountsNumbers();
        }
      });
  }

  initAccountsNumbers(){
    // @ts-ignore
    this.dataService.getAccountsNumbers()
      //@ts-ignore
      .subscribe((res: {
        status?: number,
        body: {
          accounts?: Account[],
        }
      }) => {
        if (res.body.accounts && res.status == 200) {
          this.accountsNumbers = res.body.accounts;
          this.accountNumbersSubject.next([...this.accountsNumbers]);
        }
      });
  }

  initPayments(){
    // @ts-ignore
    this.dataService.getPayments(this.authService.getUser().level)
      //@ts-ignore
      .subscribe((res: {
        status?: number,
        body: {
          payments?: Payment[],
        }
      }) => {
        if (res.body.payments) {
          this.payments = res.body.payments;
          this.paymentSubject.next([...this.payments]);
        }
      });
  }

  initPayouts(){
    // @ts-ignore
    this.dataService.getPayouts(this.authService.getUser().level)
      //@ts-ignore
      .subscribe((res: {
        status?: number,
        body: {
          payouts?: Payment[],
        }
      }) => {
        if (res.body.payouts) {
          this.payouts = res.body.payouts;
          this.payoutSubject.next([...this.payouts]);
        }
      });
  }

  initUsers(){
    // @ts-ignore
    this.dataService.getUsers()
      //@ts-ignore
      .subscribe((res: {
        status?: number,
        body: {
          users?: User[],
        }
      }) => {
        if (res.body.users) {
          this.users = res.body.users;
          this.usersSubject.next([...this.users]);
        }
      });
  }

  initTransactions(){
    // @ts-ignore
    this.dataService.getTransactions(this.authService.getUser().level)
      //@ts-ignore
      .subscribe((res: {
        status?: number,
        body: {
          transactions?: Transaction[],
        }
      }) => {
        if (res.body.transactions) {
          this.transactions = res.body.transactions;
          this.transactionSubject.next([...this.transactions]);
        }
      });
  }

  initCurrencies(){
    this.dataService.getCurrencyList()
      .subscribe((res : any) => {
        if (res.currencies){
          this.currencies = Object.keys(res.currencies);
          this.currenciesSubject.next(this.currencies);
          this.currenciesNames = Object.values(res.currencies);
          this.currenciesNameSubject.next(this.currenciesNames);
        }
      });
  }

  getAccounts(){
    return this.accountSubject;
  }

  getUsers(){
    return this.usersSubject;
  }

  getPayments(){
    return this.paymentSubject;
  }

  getPayouts(){
    return this.payoutSubject;
  }

  getTransactions(){
    return this.transactionSubject;
  }

  getCurrencies(){
    return this.currenciesSubject;
  }

  getCurrenciesNames(){
    return this.currenciesNameSubject;
  }

  getAllAccountsNumbers(){
    return this.accountNumbersSubject;
  }

  addAccount(account : Account){
    this.dataService.addAccount(account)
      //@ts-ignore
      .subscribe((res: {
        status?: number,
        body: {
          account?: Account,
        }
      }) => {
        if (res.body.account){
          this.toastr.success("Account added successfully!");
          this.accounts.push(res.body.account);
          this.accountSubject.next(this.accounts);
          this.initAccounts();
        }
      }, e => {
        if (e.error.message) {
          this.toastr.error(e.error.message);
        }
      });
  }

  addPayment(payment : Payment){
    this.dataService.addPayment(payment)
      //@ts-ignore
      .subscribe((res: {
        status?: number,
        body: {
          payment?: Payment,
        }
      }) => {
        if (res.body.payment){
          this.initAccounts();
          this.toastr.success("Successful deposit!");
          this.payments.push(res.body.payment);
          this.paymentSubject.next(this.payments);
        }
      }, e => {
        if (e.error.message) {
          this.toastr.error(e.error.message);
        }
      });
  }

  addPayout(payout : Payment){
    this.dataService.addPayout(payout)
      //@ts-ignore
      .subscribe((res: {
        status?: number,
        body: {
          payout?: Payment,
        }
      }) => {
        if (res.body.payout){
          this.initAccounts();
          this.toastr.success("Payout successful!");
          this.payouts.push(res.body.payout);
          this.payoutSubject.next(this.payouts);
        }
      }, e => {
        if (e.error.message) {
          this.toastr.error(e.error.message);
        }
      });
  }

  addTransaction(transaction : Transaction){
    this.dataService.addTransaction(transaction)
      //@ts-ignore
      .subscribe((res: {
        status?: number,
        body: {
          transaction?: Transaction,
        }
      }) => {
        if (res.body.transaction){
          this.initAccounts();
          this.toastr.success("Transaction successful!");
          this.transactions.push(res.body.transaction);
          this.transactionSubject.next(this.transactions);
        }
      }, e => {
        if (e.error.message) {
          this.toastr.error(e.error.message);
        }
      })
  }

  deleteAccount(id : string){
    this.dataService.deleteAccount(id)
      //@ts-ignore
      .subscribe((res: {
        status?: number,
        body: {
          message?: string,
          affectedRows?: string
        }
      }) => {
        if (res.status == 200){
          this.toastr.success("Account successfully deleted!");
          this.accounts = this.accounts.filter(c => c._id != id);
          this.accountSubject.next(this.accounts);
        }
      }, error => {
        this.toastr.error(error.error.message);
      });
  }

  deleteUser(id : string){
    this.dataService.deleteUser(id)
      //@ts-ignore
      .subscribe((res: {
        status?: number,
        body: {
          message?: string,
          affectedRows?: string
        }
      }) => {
        if (res.status == 200){
          this.toastr.success("User successfully deleted!");
          this.users = this.users.filter(c => c._id != id);
          this.usersSubject.next(this.users);
        }
      });
  }

  editAccount(account : Account){
    this.dataService.editAccount(account)
      //@ts-ignore
      .subscribe(((res: {
        status?: number,
        body: {
          message?: string,
          changedRows?: string
        }
      }) => {
        this.toastr.success("Edit successful!");
        this.accounts[this.accounts.findIndex(c => c._id == account._id)] = account;
        this.accountSubject.next(this.accounts);
      }),(error : any) => {
        console.log(error.body.message);
      });
  }

}
