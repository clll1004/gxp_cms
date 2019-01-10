/**
 * Created by GRE511 on 2019-01-09.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { InteractiveServiceComponent } from './components/interactive-service.component';
import { RemoteControlComponent } from './components/remote-control/remote-control.component';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
  ],
  exports: [InteractiveServiceComponent],
  declarations: [
    InteractiveServiceComponent,
    RemoteControlComponent,
  ]})

export class InteractiveServiceModule {
  constructor() { }
}
