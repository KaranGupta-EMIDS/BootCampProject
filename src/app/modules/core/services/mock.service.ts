import {
  ApiService,
  REQUEST_TYPE_GET,
  REQUEST_TYPE_PUT,
  REQUEST_TYPE_POST,
  REQUEST_TYPE_DELETE,
} from './api.service';
import { Injectable } from '@angular/core';
import { ApiBaseUrl } from '../constants/appConstants';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces/user-data';

@Injectable()
export class MockService {
  constructor(public apiService: ApiService) {}

  public getUserList(): Observable<Array<UserData>> {
    return this.apiService.getMockData();
  }
}
