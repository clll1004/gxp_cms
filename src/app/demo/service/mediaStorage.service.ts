/**
 * Created by GRE511 on 2019-01-16.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from './cookie.service';

@Injectable()
export class MediaStorageService {
  public domain:string = 'https://api.gomgxp.com/cms/media/storagebox';
  public usrSeq:any = 0;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.usrSeq = this.cookieService.getCookie('usr_seq');
  }

  /*미디어 보관함 타이틀*/
  getStorageListTitle() {
    return this.http.get<any>(`${this.domain}/title?usr_seq=${this.usrSeq}`)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }

  /*미디어 보관함 리스트*/
  getStorage() {
    return this.http.get<any>(`${this.domain}/boxlist?usr_seq=${this.usrSeq}`)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }

  postStorage(valueArray) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/html',
      })
    };

    const data:object = {
      usr_seq: this.usrSeq,
      list: valueArray
    };

    return this.http.post(`${this.domain}/boxadd`, data, httpOptions)
      .toPromise()
      .catch((error) => {
        console.log(error);
      });
  }

  /*미디어 보관함 별 콘텐츠 리스트*/
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
