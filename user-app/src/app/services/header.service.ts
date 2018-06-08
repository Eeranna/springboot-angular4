import { Injectable } from '@angular/core';

@Injectable()
export class HeaderService {

  years = ['2013','2014','2015','2016','2017','2018'];
  countries = ['India','Srilanka','Bangladesh','Pakistan','China','Nepal','Afgnistan'];

  constructor() { }

  getCountry() {
    return this.countries;
  }
  getYear() {
    return this.years;
  }

}
