/**
 * Created by GRE511 on 2018-10-25.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './components/login.component';

import { CmsApis } from '../services/apis/apis';
import { LoginService } from '../services/apis/cms/login/login.service';

import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@NgModule({
  imports: [
    RouterModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
  ],
  exports: [LoginComponent],
  declarations: [LoginComponent],
  providers: [
    CmsApis,
    LoginService,
  ],
})

export class LoginModule { }

