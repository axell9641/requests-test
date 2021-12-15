import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, EMPTY } from 'rxjs';

import { environment } from 'src/environments/environment';
import { RequestViewer } from '../models/request.viewer.model';
import { RequestResponse } from '../models/request.response.model';
import { StatusRequest } from '../../shared/constants/status-request';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  public findByStatus(state?: StatusRequest): Observable<RequestViewer[]> {
    const api = environment.apiRequest + 'requests';
    return this.http
      .get<RequestResponse[]>(api, { params: { state } })
      .pipe(
        map((response) => response.map((item) => new RequestViewer(item))),
        map((request) => request.reverse()),
        catchError((error: HttpErrorResponse) => {
          return this.handlerError(error);
        })
      );
  }

  public findAll(): Observable<RequestViewer[]> {
    const api = environment.apiRequest + 'requests';
    return this.http.get<RequestResponse[]>(api).pipe(
      map((response) => response.map((item) => new RequestViewer(item))),
      map((request) => request.reverse()),
      catchError((error: HttpErrorResponse) => this.handlerError(error))
    );
  }

  public findById(id: string): Observable<RequestResponse> {
    const api = environment.apiRequest + 'requests/' + id;
    return this.http
      .get<RequestResponse>(api)
      .pipe(map((response) => response));
  }

  public denegate(id: string, reason: string): Observable<any> {
    const api = environment.apiRequest + 'requests/' + id;
    return this.http
      .delete(api, { params: { reason } })
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public approve(id: string, payload: any): Observable<any> {
    const api = environment.apiRequest + 'requests/' + id + '/approve';
    return this.http
      .post(api, payload)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  private handlerError(error: HttpErrorResponse): Observable<[]> {
    console.error(error);
    return throwError(error);
  }
}
