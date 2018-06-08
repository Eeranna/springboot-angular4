import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import {Tracks} from '../shared/tracks.model';

export class TracksService {
  tracksChanged = new Subject<Tracks[]>();
  startedEditing = new Subject<number>()
  private tracks: Tracks[] = [
    new Tracks('SUPPLY CHAIN MANAGEMENT', 5),
    new Tracks('SC3', 10),
    new Tracks('CUSTOMER CARE - GSLO', 20),
    new Tracks('CUSTOMER CARE - GSLO NPRD', 30),
    new Tracks('CUSTOMER CARE - AS', 10),
    new Tracks('ANNUITY', 50),
    new Tracks('ORDER MANAGEMENT', 50)
  ];

  getTracks() {
    return this.tracks.slice();
  }

  getTrack(index: number) {
    return this.tracks[index];
  }

  addTrack(ingredient: Ingredient) {
    this.tracks.push(ingredient);
    this.tracksChanged.next(this.tracks.slice());
  }

  addTracks(tracks: Tracks[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.tracks.push(...tracks);
    this.tracksChanged.next(this.tracks.slice());
  }
  updateTrack(index: number, newIngredient: Ingredient) {
    this.tracks[index] = newIngredient;
    this.tracksChanged.next(this.tracks.slice());
  }

  deleteTrack(index: number) {
    this.tracks.splice(index, 1);
    this.tracksChanged.next(this.tracks.splice(0));
  }
}
