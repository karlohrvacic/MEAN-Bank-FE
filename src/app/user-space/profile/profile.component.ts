import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/models/user.model";
import {AuthService} from "../../shared/services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user? : User;
  editing : boolean = false;
  profileForm : FormGroup = null!;

  constructor(private auth : AuthService, private fb : FormBuilder, private toastr : ToastrService) { }

  ngOnInit(): void {

    // @ts-ignore
    this.user = this.auth.getUser();

    this.profileForm = this.fb.group({
      name : new FormControl(this.user?.name, [Validators.required]),
      surname: new FormControl(this.user?.surname, [Validators.required]),
      email: new FormControl(this.user?.email, [Validators.required, Validators.email]),
      level: 0
    })
  }

  ifEditing(){
    if (this.editing){
      this.toastr.info("You will be logged out on save!")
    }
    return this.editing
  }

  submit(){
    this.auth.updateUser(this.profileForm.value);
  }

}
