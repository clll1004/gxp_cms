/**
 * Created by GRE511 on 2018-10-24.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header.component';

import { LoginService } from '../services/apis/cms/login/login.service';
import { CookieService } from '../services/library/cookie/cookie.service';

@NgModule({
  imports: [
    RouterModule,
  ],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
  providers: [LoginService, CookieService],
})

export class HeaderModule { }

