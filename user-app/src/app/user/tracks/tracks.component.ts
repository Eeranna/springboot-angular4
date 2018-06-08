import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Tracks } from "../../shared/tracks.model";
import { TracksService } from "../../services/tracks.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import * as c3 from 'c3';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {
  @ViewChild('f') userCreateForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedTrackIndex: number;
  editedTrack: Tracks;
  tracks: Tracks[];
  private sub: any;
  constructor(private trackService: TracksService, private router: Router) { }

  ngOnInit() {

    const tracksdetails = c3.generate({
      bindto: '#tracksdetails',
      size: {
        height: 275
      },
      data: {
        columns: [
          ['data1', 30],
          ['data2', 120],
        ],
        type : 'donut',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("SUPPLY CHAIN MANAGEMENT", d, i); },
        onmouseout: function (d, i) { console.log("ORDER MANAGEMENT", d, i); }
      },
      donut: {
        title: "Tracks Details"
      }
    });

    setTimeout(function () {
      tracksdetails.load({
        columns: [
          ["SUPPLY CHAIN MANAGEMENT", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
          ["ORDER MANAGEMENT", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
          ["SC3", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
          ["CUSTOMER CARE - GSLO", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
        ]
      });
    }, 1500);

    setTimeout(function () {
      tracksdetails.unload({
        ids: 'data1'
      });
      tracksdetails.unload({
        ids: 'data2'
      });
    }, 2500);


    this.subscription = this.trackService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedTrackIndex = index;
          this.editMode = true;
          this.editedTrack = this.trackService.getTrack(index);
          this.userCreateForm.setValue({
            name: this.editedTrack.name,
            amount: this.editedTrack.amount
          });
        }
      );

    this.tracks = this.trackService.getTracks();
    this.subscription = this.trackService.tracksChanged
      .subscribe(
        (ingredients: Tracks[]) => {
          this.tracks = ingredients;
        }
      );
  }
  onSubmitValidate(form: NgForm) {
    const value = form.value;
    const newTrack = new Tracks(value.name, value.amount);
    if (this.editMode) {
      this.trackService.updateTrack(this.editedTrackIndex, newTrack);
    } else {
      this.trackService.addTrack(newTrack);
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.userCreateForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.trackService.deleteTrack(this.editedTrackIndex);
    this.onClear();
  }

  onEditTrack(index: number) {
    this.trackService.startedEditing.next(index);
  }

  redirectUserPage() {
    this.router.navigate(['/user']);
  }
}
