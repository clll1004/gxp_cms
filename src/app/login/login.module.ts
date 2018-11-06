/**
 * Created by GRE511 on 2018-10-25.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupModule } from '../common/popup/popup.module';

import { LoginComponent } from './components/login.component';

import { CmsApis } from '../services/apis/apis';
import { LoginService } from '../services/apis/cms/login/login.service';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    PopupModule,
  ],
  exports: [LoginComponent],
  declarations: [LoginComponent],
  providers: [
    CmsApis,
    LoginService,
  ],
})

export class LoginModule { }

