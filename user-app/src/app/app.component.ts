import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Angular 4 CRUD application with Spring Boot REST service!!';
  constructor(private router: Router) {}
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyBkZVIWL8is4E7TaCE4EnLpHFJi8Odajk0",
      authDomain: "ng-signup.firebaseapp.com"
    });
    this.router.navigate(['/']);
  }
  onBack() {
    this.router.navigate(['signin'])
  }
}
