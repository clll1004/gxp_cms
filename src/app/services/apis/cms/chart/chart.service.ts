/**
 * Created by GRE511 on 2018-09-11.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ChartService {
  constructor(private http: Http) { }

  getLists(listUrl:any) {
    return this.http.get(listUrl)
      .toPromise()
      .then((cont) => {
        return JSON.parse(cont['_body']);
      });
  }
}
