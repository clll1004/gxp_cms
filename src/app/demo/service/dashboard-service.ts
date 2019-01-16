/**
 * Created by GRE511 on 2019-01-14.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from '../../demo/service/cookie-service';

@Injectable()
export class DashboardService {
  public domain:string = 'https://api.gomgxp.com/cms/dashboard';
  public usrSeq:any = 0;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.usrSeq = this.cookieService.getCookie('usr_seq');
  }

  getGXPUsage() {
    return this.http.get<any>(`${this.domain}/used?usr_seq=${this.usrSeq}`)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }

  getStorageUsage() {
    return this.http.get<any>(`${this.domain}/storage?usr_seq=${this.usrSeq}`)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }

  getTimePlayCount(range:any[]) {
    return this.http.get<any>(`${this.domain}/playcnttime?usr_seq=${this.usrSeq}&sdate=${range[0]}&edate=${range[1]}`)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }

  getContentsPlayCount(range:any[]) {
    return this.http.get<any>(`${this.domain}/playcntcontent?usr_seq=${this.usrSeq}&sdate=${range[0]}&edate=${range[1]}`)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }

  getCategoryPlayCount(range:any[]) {
    return this.http.get<any>(`${this.domain}/playcntcategory?usr_seq=${this.usrSeq}&sdate=${range[0]}&edate=${range[1]}`)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }

  getTraffic(range:any[]) {
    return this.http.get<any>(`${this.domain}/traffic?usr_seq=${this.usrSeq}&sdate=${range[0]}&edate=${range[1]}`)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }
}
