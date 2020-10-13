import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// import { AppStateAction } from '../reducers/reducersAction/appStateAction';
import { ApiBaseUrl } from '../constants/appConstants';
import { UserData } from '../interfaces/user-data';

export const REQUEST_TYPE_GET = 'REQUEST_TYPE_GET', // request.method === 0
  REQUEST_TYPE_POST = 'REQUEST_TYPE_POST', // request.method === 1
  REQUEST_TYPE_PUT = 'REQUEST_TYPE_PUT', // request.method === 2
  REQUEST_TYPE_DELETE = 'REQUEST_TYPE_DELETE'; // request.method === 3

@Injectable()
export class ApiService {
  constructor(private _http: HttpClient,
    //  private _store: Store<any>
    ) {}

  public requestOptions: {
    headers?: HttpHeaders;
    observe?: 'body';
    // body?: any,
    params?: HttpParams;
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  };

  public getMockData(): Observable<Array<UserData>> {
    return this._http.get('assets/mock/user-list.json').pipe(
      map((userList: Array<UserData>) => {
        // console.log(userList);
        return userList;
      })
    );
  }

  public callApiService({
    requestType,
    url,
    headers,
    body,
    shouldBlock,
    responseType,
  }: {
    requestType: string;
    url: string;
    headers?: HttpHeaders;
    body?: string;
    shouldBlock?: boolean;
    responseType?;
  }): Observable<any> {
    // ensure we have at least a default headers object
    if (!headers) {
      headers = new HttpHeaders();
    }

    // use request options to always set {'withCredentials':true} as well as passing a body on DELETE requests
    if (!headers) {
      headers = new HttpHeaders().set('Content-Type', 'application/json');
    }

    this.requestOptions = {
      // body,
      headers,
      responseType,
      withCredentials: true,
    };

    let response: Observable<Response>;
    const reqObj = { reqUrl: url, requestType: requestType };
    switch (requestType) {
      case REQUEST_TYPE_GET:
        response = this._http
          .get(url, { ...this.requestOptions, observe: 'response' })
          .pipe(
            map((res) => {
              return this.getResponseContent(url, res);
            })
          )
          .pipe(
            catchError((err) => {
              return Observable.throw(err);
            })
          );

        break;

      case REQUEST_TYPE_POST:
        response = this._http
          .post(url, body, { ...this.requestOptions, observe: 'response' })
          .pipe(
            map((res) => {
              return this.getResponseContent(url, res);
            })
          )
          .pipe(
            catchError((err) => {
              return observableThrowError(err);
            })
          );
        break;

      case REQUEST_TYPE_PUT:
        response = this._http
          .put(url, body, { ...this.requestOptions, observe: 'response' })
          .pipe(
            map((res) => {
              return this.getResponseContent(url, res);
            })
          )
          .pipe(
            catchError((err) => {
              return observableThrowError(err);
            })
          );
        break;

      case REQUEST_TYPE_DELETE:
        const requestOptions = this.extendsRequestOptions({ body });
        response = this._http
          .request('DELETE', url, { ...requestOptions, observe: 'response' })
          .pipe(
            map((res) => {
              return this.getResponseContent(url, res);
            })
          )
          .pipe(
            catchError((err) => {
              return observableThrowError(err);
            })
          );
        break;

      default:
        throw new Error(
          `invalid value provided for RequestType => [${requestType}]`
        );
    }
    return response;
  }

  private extendsRequestOptions(options) {
    // tslint:disable-next-line:prefer-object-spread
    let requestOptions = Object.assign({}, this.requestOptions);
    if (options) {
      // tslint:disable-next-line:prefer-object-spread
      requestOptions = Object.assign({}, this.requestOptions, options);
    }
    return requestOptions;
  }

  private getResponseContent(url: string, res: any) {
    try {
      let contentType = res.headers.get('content-type');
      if (contentType && contentType.indexOf(';') !== -1) {
        // strip the charset declaration to simplify the comparison
        contentType = contentType.substring(0, contentType.indexOf(';'));
      }
      // console.log(`contentType => [${contentType}]`);
      switch (contentType) {
        case 'application/x-file-download':
          return res;

        case 'application/json':
          return res.json();

        case 'text/plain':
        case 'text/html':
          return res.text();

        case 'application/vnd.ms-excel':
          return res.blob();

        case null:
          return null;

        default:
          return res.text() ? res.json() : {};
      }
    } catch (e) {
      let resContent = JSON.stringify(res).substr(0, 512);
      throw e;
    } finally {
      //
    }
  }
}
