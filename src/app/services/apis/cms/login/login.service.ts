import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { CookieService } from '../../../library/cookie/cookie.service';

@Injectable()
export class LoginService {
  public loginInfo:any = {};
  public loginStatus:boolean = false;

  constructor(private http: Http, private router: Router, private cookieService: CookieService) { }

  setLogin() {
    this.loginStatus = true;
  }

  setLogout() {
    this.loginStatus = false;
  }

  login(url, id:string, password:string) {
    this.loginInfo.usr_id = id;
    this.loginInfo.usr_pw = password;

    const headers:Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return this.http.post(url, this.loginInfo, { headers });
  }

  setCookieData(userInfo, userSeq, userName, groupSeq) {
    this.cookieService.setCookie('userInfo', userInfo, 7, true);
    this.cookieService.setCookie('usr_seq', userSeq, 7);
    this.cookieService.setCookie('usr_nm', userName, 7);
    this.cookieService.setCookie('grp_seq', groupSeq, 7);
  }

  logout() {
    if (this.cookieService.getCookie('userInfo')) {
      this.clearUserInfo();
    }
  }

  checkUserInfo() {
    if (!(this.cookieService.getCookie('userInfo'))) {
      this.clearUserInfo();
    }
  }

  clearUserInfo() {
    this.setLogout();
    this.cookieService.deleteCookie('userInfo');
    this.cookieService.deleteCookie('usr_seq');
    this.cookieService.deleteCookie('usr_nm');
    this.cookieService.deleteCookie('grp_seq');
    this.router.navigate(['/', 'login']);
  }
}
