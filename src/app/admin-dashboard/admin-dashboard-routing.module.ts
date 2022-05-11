import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {UserDashboardComponent} from "./user-dashboard/user-dashboard.component";
import {ViewTransactionsComponent} from "../shared/view-transactions/view-transactions.component";
import {UserAccountsComponent} from "./user-accounts/user-accounts.component";


const routes : Route[] = [
  {path: '', component : UserDashboardComponent},
  {path: 'accounts/:accId', component : UserAccountsComponent},
  {path: 'accounts/:accId/transactions/:id', component : ViewTransactionsComponent}

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
