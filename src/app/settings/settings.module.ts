/**
 * Created by GRE511 on 2018-10-24.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupModule } from '../common/popup/popup.module';

import { SettingsComponent } from './components/settings.component';
import { GroupMngComponent } from './components/group-mng/group-mng.component';
import { UserModifyComponent } from './components/user-modify/user-modify.component';
import { ChangePswdComponent } from './components/change-pswd/change-pswd.component';

import { CmsApis } from '../services/apis/apis';
import { SettingsService } from '../services/apis/cms/settings/settings.service';
import { CookieService } from '../services/library/cookie/cookie.service';

import { PanelModule } from 'primeng/panel';
import { BlockUIModule } from 'primeng/blockui';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PopupModule,
    PanelModule,
    BlockUIModule,
    TableModule,
    TreeModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    PasswordModule,
  ],
  exports: [SettingsComponent],
  declarations: [
    SettingsComponent,
    GroupMngComponent,
    UserModifyComponent,
    ChangePswdComponent,
  ],
  providers: [
    CmsApis,
    SettingsService,
    CookieService,
  ],
})

export class SettingsModule { }
