import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import * as c3 from 'c3';
import {Router} from "@angular/router";

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  constructor(private router: Router) {}
  genders = ['male', 'female'];
  signupForm: FormGroup;
  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'tracks': new FormArray([])
    });

    const totalspendchart = c3.generate({
      bindto: '#totalspendchart',
      size: {
        height: 275
      },
      data: {
        columns: [
          ['data', 30, 500, 200, 600, 450, 350],
          ['concurrent', 30, 300, 200, 300, 250, 350],
          ['appd', 30, 200, 100, 400, 150, 250],
          ['tidal', 30, 200, 100, 400, 150, 250]
        ],
        type: 'bar'
      },
      bar: {
        width: {
          ratio: 0.5 // this makes bar width 50% of length between ticks
        }
      }
    });
  }
  onSubmit() {
    console.log(this.signupForm);
  }
  onAddTrack() {
    console.log('this is onAddTrack');
    // (<FormArray>this.signupForm.get('tracks')).push(control);
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('tracks')).push(control);
  }
  monthlySpend() {
    console.log('monthlyspend!');
  }
  quarterlySpend() {
    console.log('quarterlySpend');
  }
  redirectUserPage() {
    this.router.navigate(['/home']);
  }

}
