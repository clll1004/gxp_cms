/**
 * Created by GRE511 on 2019-01-21.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from './cookie.service';

@Injectable()
export class TwoWayService {
  public domain:string = 'https://api.gomgxp.com/cms/twoway';
  public usrSeq:any = 0;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.usrSeq = this.cookieService.getCookie('usr_seq');
  }

  /* 광고관리 */
  getAdList() {
    return this.http.get<any>(`${this.domain}/ad/list?usr_seq=${this.usrSeq}`)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }
}
