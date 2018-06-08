import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private authService: AuthService) {}
}
