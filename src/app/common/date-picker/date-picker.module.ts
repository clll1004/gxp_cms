/**
 * Created by GRE511 on 2018-08-31.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';

import { DatePickerComponent } from './components/date-picker.component';

@NgModule({
  imports: [CommonModule, FormsModule, CalendarModule],
  exports: [DatePickerComponent],
  declarations: [DatePickerComponent]
})
export class DatePickerModule { }
