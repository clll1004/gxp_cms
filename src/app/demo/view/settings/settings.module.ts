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
import { UserPresetComponent } from './components/user-preset/user-preset.component';

import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';

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
  ],
  exports: [SettingsComponent],
  declarations: [
    SettingsComponent,
    AccountComponent,
    UserPresetComponent,
    InfoComponent,
  ]})

export class SettingsModule {
  constructor() { }
}
