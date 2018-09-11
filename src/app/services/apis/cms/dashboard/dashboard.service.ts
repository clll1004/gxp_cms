/**
 * Created by GRE511 on 2018-09-11.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class DashboardService {
  constructor(private http: Http) { }
  getLists(listUrl:any) {
    return this.http.get(listUrl);
  }
}
