import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BankService} from "../shared/services/bank.service";
import {AdminDashboardRoutingModule} from "./admin-dashboard-routing.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule
  ],
  providers: [BankService]

})
export class AdminDashboardModule { }
