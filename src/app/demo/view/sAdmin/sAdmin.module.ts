/**
 * Created by GRE511 on 2019-01-30.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { SAdminComponent } from './components/sAdmin.component';
import { RealTimeMonitoringComponent } from './components/realtime-monitoring/realtime-monitoring.component';
import { EncodingMonitoringComponent } from './components/encoding-monitoring/encoding-monitoring.component';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { ClientManagerComponent } from './components/client-manager/client-manager.component';
import { LicenseManagerComponent } from './components/license-manager/license-manager.component';
import { LicenseDetailComponent } from './components/license-detail/license-detail.component';
import { SupportManagerComponent } from './components/support-manager/support-manager.component';
import { SupportDetailComponent } from './components/support-detail/support-detail.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    DialogModule,
    CalendarModule,
  ],
  exports: [SAdminComponent],
  declarations: [
    SAdminComponent,
    RealTimeMonitoringComponent,
    EncodingMonitoringComponent,
    UserManagerComponent,
    ClientManagerComponent,
    LicenseManagerComponent,
    LicenseDetailComponent,
    SupportManagerComponent,
    SupportDetailComponent,
  ]})

export class SAdminModule {
  constructor() { }
}
