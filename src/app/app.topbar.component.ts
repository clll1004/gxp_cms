import { Component } from '@angular/core';
import { LoginService } from './demo/service/login.service';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

  constructor(public app: AppComponent, private loginService: LoginService) {}

  logout() {
    this.loginService.logout();
  }
}
