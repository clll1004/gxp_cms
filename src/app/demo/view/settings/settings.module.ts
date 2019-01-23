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
import { UserPresetComponent } from './components/user-preset/user-preset.component';

import { TabMenuModule } from 'primeng/tabmenu';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    TabMenuModule,
  ],
  exports: [SettingsComponent],
  declarations: [
    SettingsComponent,
    AccountComponent,
    UserPresetComponent,
  ]})

export class SettingsModule {
  constructor() { }
}
