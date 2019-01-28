/**
 * Created by GRE511 on 2019-01-28.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from './cookie.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {
  public loginInfo:any = {};
  public loginStatus:boolean = false;

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }

  login(id:string, password:string) {
    this.loginInfo.usr_id = id;
    this.loginInfo.usr_pw = password;

    const headers:HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return this.http.post('http://183.110.11.49/cms/login', this.loginInfo, { headers });
  }

  logout() {
    if (this.cookieService.getCookie('usr_seq')) {
      this.clearUserInfo();
    }
  }

  setLogin() {
    this.loginStatus = true;
  }

  setLogout() {
    this.loginStatus = false;
  }

  setCookieData(userSeq, groupSeq) {
    this.cookieService.setCookie('usr_seq', userSeq, 7);
    this.cookieService.setCookie('grp_seq', groupSeq, 7);
  }

  checkUserInfo(url) {
    if (!(this.cookieService.getCookie('usr_seq')) && url !== '/login' && url !== '/new-password' && url !== '/new-password-complete') {
      this.clearUserInfo();
    }
  }

  clearUserInfo() {
    this.setLogout();
    this.cookieService.deleteCookie('usr_seq');
    this.cookieService.deleteCookie('grp_seq');
    this.router.navigate(['/login']);
  }
}
