import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthInterceptor} from "./auth/auth.interceptor";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ViewTransactionsComponent } from './shared/view-transactions/view-transactions.component';
import { ProfileComponent } from './user-space/profile/profile.component';
import { UserDashboardComponent } from './admin-dashboard/user-dashboard/user-dashboard.component';
import { UserAccountsComponent } from './admin-dashboard/user-accounts/user-accounts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";
import { Error404Component } from './shared/error404/error404.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ViewTransactionsComponent,
    ProfileComponent,
    UserDashboardComponent,
    UserAccountsComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      progressBar: true,
      closeButton: true,
      maxOpened: 5,
      preventDuplicates: true
    }),
    CurrencyMaskModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
