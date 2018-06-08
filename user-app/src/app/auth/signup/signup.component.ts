import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {Popup} from "ng2-opd-popup";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, private popup: Popup) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password);

    this.popup.options = {
      header: "Success Popup!!!",
      color: "#42b72a",
      widthProsentage: 60,
      animationDuration: 1,
      showButtons: true,
      confirmBtnContent: "OK",
      cancleBtnContent: "Close",
      confirmBtnClass: "btn btn-default",
      cancleBtnClass: "btn btn-default",
      animation: "fadeInDown"
    };
    this.router.navigate(['/signup']);
    this.popup.show();
    form.reset();
  }
  onBack() {
    this.router.navigate(['signin'])
  }
  onReset(form: NgForm) {
    form.reset();
  }

}
