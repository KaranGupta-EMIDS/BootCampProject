import {ApiService,REQUEST_TYPE_GET,REQUEST_TYPE_PUT,REQUEST_TYPE_POST,REQUEST_TYPE_DELETE} from '../services/api.service';
import { Injectable } from '@angular/core';
import {ApiBaseUrl} from '../constants/appConstants';
import { ResponseContentType } from '@angular/http';

@Injectable()
export class TestService{
    constructor(public apiService:ApiService){}

   /**
    * testJson
    */
   public testJson() {
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_GET,
            url: `${ApiBaseUrl}/test`,
            // body: JSON.stringify(params.attr),
            shouldBlock:false,
            // responseType:ResponseContentType.Json
        });
   }
   

}