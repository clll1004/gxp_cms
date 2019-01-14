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
import { LiveAddComponent } from './components/live-chat/components/live-add/live-add.component';
import { LiveDetailComponent } from './components/live-chat/components/live-detail/live-detail.component';
import { LiveBroadcastComponent } from './components/live-broadcast/live-broadcast.component';
import { BroadListComponent } from './components/live-broadcast/components/broad-list/broad-list.component';
import { BroadAddComponent } from './components/live-broadcast/components/broad-add/broad-add.component';
import { EventPlayerComponent } from './components/event-player/event-player.component';
import { EventListComponent } from './components/event-player/components/event-list/event-list.component';
import { EventAddComponent } from './components/event-player/components/event-add/event-add.component';
import { RemoteControlComponent } from './components/remote-control/remote-control.component';

import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';

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
    RadioButtonModule,
    DialogModule,
    DropdownModule,
    InputTextareaModule,
    InputSwitchModule,
  ],
  exports: [InteractiveServiceComponent],
  declarations: [
    InteractiveServiceComponent,
    LiveChatComponent,
    LiveListComponent,
    LiveAddComponent,
    LiveDetailComponent,
    LiveBroadcastComponent,
    BroadListComponent,
    BroadAddComponent,
    EventPlayerComponent,
    EventListComponent,
    EventAddComponent,
    RemoteControlComponent,
  ]})

export class InteractiveServiceModule {
  constructor() { }
}
