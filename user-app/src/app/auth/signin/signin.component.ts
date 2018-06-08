import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {Popup} from "ng2-opd-popup";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, private popup: Popup) { }

  ngOnInit() {
  }
  onSignin(signinForm: NgForm) {
   const email = signinForm.value.email;
   const password = signinForm.value.password;
   this.authService.signinUser(email, password);
   signinForm.reset();
  }
  onSignUp() {
    this.router.navigate(['signup'])
  }
  onReset(form: NgForm) {
    form.reset();
  }
}
