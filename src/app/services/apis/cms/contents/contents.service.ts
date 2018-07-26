/**
 * Created by GRE511 on 2018-07-26.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class ContentsService {
  constructor(private http: Http) {  }

  getLists(listUrl:any) {
    return this.http.get(listUrl);
  }

  updateData(url:string, newData:any[]) {
    let headers:Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return this.http.put(url, newData, { headers: headers });
  }
}