/**
 * Created by GRE511 on 2019-01-16.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from './cookie.service';

@Injectable()
export class MediaTransformService {
  public domain:string = 'https://api.gomgxp.com/cms/media/transform';
  public usrSeq:any = 0;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.usrSeq = this.cookieService.getCookie('usr_seq');
  }

  getTransList(status:any) {
    let apis:string = '';
    if (status === '전체') {
      apis = `${this.domain}/list?usr_seq=${this.usrSeq}`;
    } else {
      apis = `${this.domain}/list?usr_seq=${this.usrSeq}&status=${status}`;
    }
    return this.http.get<any>(apis)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }
}
