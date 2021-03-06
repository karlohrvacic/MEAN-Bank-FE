import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {User} from "../models/user.model";
import {Subscription} from "rxjs";
import {Location} from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user? : User;
  authenticated : boolean = false;
  authChangeSubscription : Subscription | undefined;

  constructor(private router : Router, private auth : AuthService, public location: Location) {
  }

  ngOnInit(): void {
    this.authChangeSubscription = this.auth.authChange
      .subscribe(authenticated => {
        this.authenticated = authenticated;
        if (this.authenticated) { // @ts-ignore
          this.user = this.auth.getUser();
        }
      });
  }

  getClass(a : string){
    return this.router.url == a ? 'active' : '';
  }

  logout(){
    this.auth.logout();
  }

  ngOnDestroy(){
    if (this.authChangeSubscription) {
      this.authChangeSubscription.unsubscribe();
    }
  }

}
