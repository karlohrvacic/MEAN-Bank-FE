import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../models/user.model";
import {Account} from "../models/account.model";
import {Transaction} from "../models/transaction.model";
import {Payment} from "../models/payment.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  private apiUrl : string = environment.API_URL + '/api/v1/';

  login(credentials : User) {
    return this.http.post(this.apiUrl + 'auth/login', credentials, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    });
  }

  register(user : User) {
    return this.http.post(this.apiUrl + 'auth/register', user, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    });

  }

  whoAmI(){
    return this.http.get(this.apiUrl + 'me', {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    });
  }

  getAccounts(level : number){
    if (level == 1){
      return this.http.get(this.apiUrl + 'accounts', {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        observe: 'response'
      });
    } else {
      return this.http.get(this.apiUrl + 'accounts/my', {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        observe: 'response'
      });
    }
  }

  getAccountsNumbers(){
      return this.http.get(this.apiUrl + 'accounts/numbers', {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        observe: 'response'
      });
  }

  addAccount(account : Account){
    return this.http.post(this.apiUrl + 'accounts/', account, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    });

  }

  deleteAccount(id : any){
    return this.http.delete(this.apiUrl + `accounts/${id}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    });
  }

  editAccount(account : Account){
    return this.http.put(this.apiUrl + 'comments/', account, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    });
  }

  editUser(user : User){
    return this.http.put(this.apiUrl + 'users/', user, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    });
  }

  getTransactions(level : number){
    if (level == 1){
      return this.http.get(this.apiUrl + 'transactions', {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        observe: 'response'
      });
    } else {
      return this.http.get(this.apiUrl + 'transactions/my', {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        observe: 'response'
      });
    }
  }

  getUsers(){
      return this.http.get(this.apiUrl + 'users', {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        observe: 'response'
      });

  }

  addTransaction(transaction : Transaction){
    return this.http.post(this.apiUrl + 'transactions/', transaction, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    });

  }

  deleteUser(id : any){
    return this.http.delete(this.apiUrl + `users/${id}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    });
  }

  editTransaction(transaction : Transaction){
    return this.http.put(this.apiUrl + 'transactions/', transaction, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    });
  }

  getPayments(level : number){
    if (level == 1){
      return this.http.get(this.apiUrl + 'payments', {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        observe: 'response'
      });
    } else {
      return this.http.get(this.apiUrl + 'payments/my', {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        observe: 'response'
      });
    }
  }

  addPayment(payment : Payment){
    return this.http.post(this.apiUrl + 'payments/', payment, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    });

  }

  getPayouts(level : number){
    if (level == 1){
      return this.http.get(this.apiUrl + 'payouts', {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        observe: 'response'
      });
    } else {
      return this.http.get(this.apiUrl + 'payouts/my', {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        observe: 'response'
      });
    }
  }

  addPayout(payment : Payment){
    return this.http.post(this.apiUrl + 'payouts/', payment, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    });
  }

  getCurrencyList(){
    return this.http.get(this.apiUrl + 'currencies/');
  }
}
