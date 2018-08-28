/**
 * Created by GRE511 on 2018-08-27.
 */
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'table-group',
  templateUrl: 'table-group.component.html'})

export class TableGroupComponent implements OnInit, OnChanges {
  @Input() headerCols:any[];
  @Input() dateArray:any[];

  public cols: any[] = [];
  public tableLists:any[] = [];

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    this.cols = [];
    this.tableLists = [];
    this.headerCols.forEach((item) => {
      this.cols.push({ header: item });
    });
    this.dateArray.forEach((item) => {
      this.tableLists.push({ date: item.getFullYear() + '-' + (item.getMonth() + 1) + '-' + item.getDate() });
    });
  }
}
