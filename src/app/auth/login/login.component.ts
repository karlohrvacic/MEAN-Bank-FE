import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {ToastrService} from "ngx-toastr";
import {BankService} from "../../shared/services/bank.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  signinForm! : FormGroup;

  constructor(private auth : AuthService) { }

  ngOnInit() {

    this.signinForm = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, Validators.required)
    });
  }

  onLogin(){
    this.auth.login(this.signinForm.value);
  }

  ngOnDestroy(): void {
  }

}

