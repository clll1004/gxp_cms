/**
 * Created by GRE511 on 2018-08-22.
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']})

export class DatePickerComponent {
  @Input() durationName:string;
  @Input() startDate:Date;
  @Input() endDate:Date;
  public selectStartDate:Date;
  public selectEndDate:Date;

  constructor() { }

  tempDate() {
    this.selectStartDate = this.startDate;
    this.selectEndDate = this.endDate;
  }

  isEnableDate() {
    this.durationName = '기간';
    if (this.startDate.getTime() > this.endDate.getTime()) {
      this.startDate.setDate(this.selectStartDate.getDate());
      this.endDate.setDate(this.selectEndDate.getDate());
    }
  }
}
