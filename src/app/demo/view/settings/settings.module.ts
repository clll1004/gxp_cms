/**
 * Created by GRE511 on 2019-01-23.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { SettingsComponent } from './components/settings.component';
import { AccountComponent } from './components/account/account.component';
import { InfoComponent } from './components/account/components/info/info.component';
import { AdminComponent } from './components/account/components/admin/admin.component';
import { ServiceManageComponent } from './components/account/components/service-manage/service-manage.component';
import { UserPresetComponent } from './components/user-preset/user-preset.component';

import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    TabMenuModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    PanelModule,
    TooltipModule,
    TableModule,
    DialogModule,
  ],
  exports: [SettingsComponent],
  declarations: [
    SettingsComponent,
    AccountComponent,
    InfoComponent,
    AdminComponent,
    ServiceManageComponent,
    UserPresetComponent,
  ]})

export class SettingsModule {
  constructor() { }
}
