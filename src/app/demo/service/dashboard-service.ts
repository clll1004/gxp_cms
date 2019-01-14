/**
 * Created by GRE511 on 2019-01-14.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from '../../demo/service/cookie-service';

@Injectable()
export class DashboardService {
  public usrSeq:any = 0;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.usrSeq = this.cookieService.getCookie('usr_seq');
  }

  getGXPUsage() {
    return this.http.get<any>(`https://api.gomgxp.com/cms/dashboard/used?usr_seq=${this.usrSeq}`)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }

  getStorageUsage() {
    return this.http.get<any>(`https://api.gomgxp.com/cms/dashboard/storage?usr_seq=${this.usrSeq}`)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }

  getTimePlayCount(range:any[]) {
    return this.http.get<any>(`https://api.gomgxp.com/cms/dashboard/playcnttime?usr_seq=${this.usrSeq}&sdate=${range[0]}&edate=${range[1]}`)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }

  getContentsPlayCount(range:any[]) {
    return this.http.get<any>(`https://api.gomgxp.com/cms/dashboard/playcntcontent?usr_seq=${this.usrSeq}&sdate=${range[0]}&edate=${range[1]}`)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }

  getCategoryPlayCount(range:any[]) {
    return this.http.get<any>(`https://api.gomgxp.com/cms/dashboard/playcntcategory?usr_seq=${this.usrSeq}&sdate=${range[0]}&edate=${range[1]}`)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }
}
