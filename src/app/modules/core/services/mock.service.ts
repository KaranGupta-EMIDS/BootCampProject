import {
  ApiService,
  REQUEST_TYPE_GET,
  REQUEST_TYPE_PUT,
  REQUEST_TYPE_POST,
  REQUEST_TYPE_DELETE,
} from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces/user-data';
import { StateCity } from '../interfaces/state-city';

@Injectable()
export class MockService {
  constructor(public apiService: ApiService) {}

  public getUserList(): Observable<Array<UserData>> {
    return this.apiService.getMockUserData();
  }

  public getStateCities():Observable<Array<StateCity>> {
    return this.apiService.getMockStateCityData();
  }
}
