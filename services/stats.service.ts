import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StadisticResponse } from '../models/stats.response.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StatusRequest } from '../../shared/constants/status-request';
import { environment } from '../../../environments/environment';
import { ItemStatsViewer } from '../models/item-stats.viewer.model';

const filterCategories = [StatusRequest.created, StatusRequest.rejected, StatusRequest.approved, StatusRequest.success];


@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  public getStats(): Observable<ItemStatsViewer[]> {
    const api = environment.apiRequest + 'requests/counts';

    return this.http.get<StadisticResponse[]>(api)
      .pipe(
        map((response) => response.filter((item) => filterCategories.includes(item.state))),
        map((filtered) => {
          const sum = filtered.reduce((total, current) => total + current.total, 0);
          const itemTotal: StadisticResponse = {
            state: StatusRequest.total,
            total: sum
          };
          return [...filtered, itemTotal];
        }),
        map(response => response.map(item => new ItemStatsViewer(item))),
        catchError((error) => this.handlerError(error))
      );
  }

  private handlerError(error: HttpErrorResponse): Observable<[]> {
    console.error(error);
    return throwError(error);
  }
}
