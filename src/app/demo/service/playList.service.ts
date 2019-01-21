/**
 * Created by GRE511 on 2019-01-15.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from './cookie.service';

@Injectable()
export class PlayListService {
  public domain:string = 'https://api.gomgxp.com/cms/media/playlist';
  public usrSeq:any = 0;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.usrSeq = this.cookieService.getCookie('usr_seq');
  }

  /*재생목록 타이틀*/
  getPlayListTitle() {
    return this.http.get<any>(`${this.domain}/title?usr_seq=${this.usrSeq}`)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }

  /*재생목록 관리 리스트*/
  getSettingPlayList() {
    return this.http.get<any>(`${this.domain}/boxlist?usr_seq=${this.usrSeq}`)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }

  postPlayList(valueArray) {
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

  /*재생목록 별 콘텐츠 리스트*/
  getPlayList(seq:any) {
    let apis:string = '';
    if (seq === 'all') {
      apis = `${this.domain}/list?usr_seq=${this.usrSeq}`;
    } else {
      apis = `${this.domain}/list?usr_seq=${this.usrSeq}&pl_seq=${seq}`;
    }
    return this.http.get<any>(apis)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }
}
