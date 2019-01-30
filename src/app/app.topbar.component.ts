import { Component, OnInit } from '@angular/core';
import { LoginService } from './demo/service/login.service';
import { AppComponent } from './app.component';
import { CookieService } from '../app/demo/service/cookie.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {
  public user:string = '';

  constructor(public app: AppComponent, private loginService: LoginService, private cookieService: CookieService) {}

  ngOnInit() {
    this.cookieService.getCookie('usr_seq') !== '0' ? this.user = 'cms' : this.user = 'admin';
  }

  logout() {
    this.loginService.logout();
  }
}
