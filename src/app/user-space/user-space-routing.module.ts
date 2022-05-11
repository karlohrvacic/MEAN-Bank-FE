import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {AccountsComponent} from "./accounts/accounts.component";
import {AtmComponent} from "./atm/atm.component";
import {TransfersComponent} from "./transfers/transfers.component";
import {ViewTransactionsComponent} from "../shared/view-transactions/view-transactions.component";
import {ProfileComponent} from "./profile/profile.component";

const routes : Route[] = [
  {path: '', component : AccountsComponent},
  {path: 'atm', component : AtmComponent},
  {path: 'profile', component : ProfileComponent},
  {path: 'transfers', component : TransfersComponent},
  {path: 'transactions/:id', component : ViewTransactionsComponent}

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserSpaceRoutingModule { }
