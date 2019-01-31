import { Component, OnInit } from '@angular/core';
import { LoginService } from './demo/service/login.service';
import { AppComponent } from './app.component';
import { CookieService } from '../app/demo/service/cookie.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {
  public user:string = '';
  public isLayoutShow: boolean = false;

  constructor(public app: AppComponent, private loginService: LoginService, private cookieService: CookieService, private router: Router) {}

  ngOnInit() {
    this.cookieService.getCookie('usr_seq') !== '0' ? this.user = 'cms' : this.user = 'admin';
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/' || event.url === '/login' || event.url === '/new-password' || event.url === '/new-password-complete' || event.url === '/reset-password' || event.url === '/expiration' || event.url === '/new-account' || event.url === '/new-account-complete') {
          this.isLayoutShow = false;
        } else {
          this.isLayoutShow = true;
        }
      }
    });
  }

  logout() {
    this.loginService.logout();
  }
}
