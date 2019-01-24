/**
 * Created by GRE511 on 2019-01-21.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from './cookie.service';

@Injectable()
export class TwoWayService {
  public domain:string = 'https://api.gomgxp.com/cms/twoway';
  public usrSeq:any = 0;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.usrSeq = this.cookieService.getCookie('usr_seq');
  }
/* 라이브 채팅 */
  getLiveChatList() {
    return this.http.get<any>(`${this.domain}/livechat/list?usr_seq=${this.usrSeq}`)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }

  addLiveChat(valueObject) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/html',
      })
    };

    valueObject.usr_seq = this.usrSeq;

    return this.http.post(`${this.domain}/livechat/add`, valueObject, httpOptions)
      .toPromise()
      .catch((error) => {
        console.log(error);
      });
  }

  deleteLiveChat(valueArray) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/html',
      })
    };

    const data:object = {
      usr_seq: this.usrSeq,
      list: valueArray
    };

    return this.http.post(`${this.domain}/livechat/selectdel`, data, httpOptions)
      .toPromise()
      .catch((error) => {
        console.log(error);
      });
  }

/* 라이브 방송 */
  /*라이브 방송 리스트*/
  getLiveBroadWeekList(today) {
    return this.http.get<any>(`${this.domain}/live/weeklist?usr_seq=${this.usrSeq}&today=${today}`)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }

  getLiveBroadList() {
    return this.http.get<any>(`${this.domain}/live/list?usr_seq=${this.usrSeq}`)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }

/* 이벤트 플레이어 */

/* 실시간 광고전송 */
  /* 광고 관리 리스트 */
  getAdList() {
    return this.http.get<any>(`${this.domain}/ad/list?usr_seq=${this.usrSeq}`)
      .toPromise()
      .then((cont) => {
        return cont;
      });
  }

  addAd(valueObject) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/html',
      })
    };

    valueObject.usr_seq = this.usrSeq;

    return this.http.post(`${this.domain}/ad/add`, valueObject, httpOptions)
      .toPromise()
      .catch((error) => {
        console.log(error);
      });
  }

/* 리모콘 연결관리 */
}
