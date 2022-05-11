import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm! : FormGroup;

  constructor(private auth : AuthService, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'name' : new FormControl(null, [Validators.required]),
      'surname' : new FormControl(null, [Validators.required]),
      'oib' : new FormControl(null, [Validators.required, Validators.min(1000000000), Validators.max(99999999999)]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'password-repeat' : new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  register(){
    if (this.registerForm.value['password'] === this.registerForm.value['password-repeat'] ){
      this.registerForm.removeControl('password-repeat');
      this.auth.register(this.registerForm.value);
    }
    else {
      this.registerForm.addControl('password-repeat',new FormControl( '',[Validators.required]));
      this.toastr.error('Passwords must match!');
    }
  }

}
