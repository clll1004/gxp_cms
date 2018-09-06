/**
 * Created by GRE511 on 2018-08-27.
 */
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'table-group',
  templateUrl: 'table-group.component.html',
  styleUrls: ['../../play-statistics.component.css']})

export class TableGroupComponent implements OnInit {
  @Input() headerCols:any[];
  @Input() dateArray:any[];
  @Input() tableLists:any[];
  @Input() defaultPagingNumber:number;
  @Input() pagingOption:any[];

  constructor() { }

  ngOnInit() { }
}
