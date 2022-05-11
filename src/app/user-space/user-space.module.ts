import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccountsComponent} from "./accounts/accounts.component";
import {UserSpaceRoutingModule} from "./user-space-routing.module";
import {AtmComponent} from "./atm/atm.component";
import {TransfersComponent} from "./transfers/transfers.component";
import {AddAccountComponent} from "./add-account/add-account.component";
import {ReactiveFormsModule} from "@angular/forms";
import {BankService} from "../shared/services/bank.service";
import {SharedModule} from "../shared/shared.module";
import {CurrencyMaskModule} from "ng2-currency-mask";

@NgModule({
  declarations: [
    AccountsComponent,
    AtmComponent,
    TransfersComponent,
    AddAccountComponent
  ],
    imports: [
        CommonModule,
        UserSpaceRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        CurrencyMaskModule
    ],
  providers: [BankService]

})
export class UserSpaceModule { }
