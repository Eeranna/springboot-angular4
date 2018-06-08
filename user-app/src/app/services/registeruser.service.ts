import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {User} from "../auth/user";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Router} from "@angular/router";

@Injectable()
export class RegisteruserService {
  constructor(private http: Http, private router: Router) {}

  registerUser(users: any[]) {
    return this.http.post('https://ng-signup.firebaseio.com/signup.json', users);
  }

  getUser() {
      return this.http.get('https://ng-signup.firebaseio.com/signup.json')
        .map((response: Response) => {
          return response.json();
        })
      /*.map(
        (response: Response) => response.json()
        /!*{
          const userData: User[]= response.json();
          console.log(userData);
         /!* for (const user of userData) {
            user.userName = user.userName;
            user.password = user.password;
            user.email = user.email;
          }
          return userData;*!/
        }*!/
      )*/
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong!');
        }
      )
  }
}
