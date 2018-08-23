/**
 * Created by GRE511 on 2018-08-22.
 */
import { NgModule } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { DatePickerComponent } from './components/date-picker.component';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CalendarModule,
    BrowserModule,
    FormsModule,
  ],
  exports: [DatePickerComponent],
  declarations: [DatePickerComponent],
  providers: []})

export class DatePickerModule {
  constructor() {}
}
