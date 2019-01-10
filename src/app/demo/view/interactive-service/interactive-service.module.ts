/**
 * Created by GRE511 on 2019-01-09.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { InteractiveServiceComponent } from './components/interactive-service.component';
import { LiveChatComponent } from './components/live-chat/live-chat.component';
import { LiveListComponent } from './components/live-chat/components/live-list/live-list.component';
import { RemoteControlComponent } from './components/remote-control/remote-control.component';

import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    CalendarModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    CheckboxModule,
  ],
  exports: [InteractiveServiceComponent],
  declarations: [
    InteractiveServiceComponent,
    LiveChatComponent,
    LiveListComponent,
    RemoteControlComponent,
  ]})

export class InteractiveServiceModule {
  constructor() { }
}
