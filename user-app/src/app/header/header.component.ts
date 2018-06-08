import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../services/header.service';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import { trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)'
      })),
      state('out', style({
        transform: 'translateX(-200px)'
      })),
      transition('in => out', animate('600ms ease-in-out')),
      transition('out => in', animate('1000ms ease-in-out'))
    ]),
  ]
})
export class HeaderComponent implements OnInit {
  yearData: Array<any>;
  countryData: Array<any>;
  isLoggedIn$: Observable<boolean>;
  constructor(private headerService: HeaderService, public authService: AuthService, private router: Router) {}

  menuState: string = 'out';
  toggleMenu() {
    // 1-line if statement that toggles the value:
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
  ngOnInit() {
    this.yearData = this.headerService.getYear();
    this.countryData = this.headerService.getCountry();
    // this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout(){
    this.authService.logout();
  }
}
