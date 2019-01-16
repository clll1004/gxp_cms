/**
 * Created by GRE511 on 2019-01-16.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from './cookie.service';

@Injectable()
export class MediaStorageService {
  public domain:string = 'https://api.gomgxp.com/cms/media/storagebox';
  public usrSeq:any = 0;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.usrSeq = this.cookieService.getCookie('usr_seq');
  }

  getStorageListTitle() {
    return this.http.get<any>(`${this.domain}/title?usr_seq=${this.usrSeq}`)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }

  getStorageList(seq:any) {
    let apis:string = '';
    if (seq === 'all') {
      apis = `${this.domain}/list?usr_seq=${this.usrSeq}`;
    } else {
      apis = `${this.domain}/list?usr_seq=${this.usrSeq}&gf_seq=${seq}`;
    }
    return this.http.get<any>(apis)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }
}
