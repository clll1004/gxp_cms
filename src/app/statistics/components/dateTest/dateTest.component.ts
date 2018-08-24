/**
 * Created by GRE511 on 2018-08-24.
 */
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'dateTest',
  templateUrl: './dateTest.component.html'})

export class DateTestComponent implements OnChanges {
  @Input() data;
  constructor() { }

  ngOnChanges() {
    console.log(this.data);
  }
}
