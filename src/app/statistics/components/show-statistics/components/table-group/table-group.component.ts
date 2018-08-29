/**
 * Created by GRE511 on 2018-08-27.
 */
import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'table-group',
  templateUrl: 'table-group.component.html'})

export class TableGroupComponent implements OnInit, OnChanges {
  @Input() headerCols:any[];
  @Input() dateArray:any[];
  @Input() showCheckbox:boolean;
  @Input() tableLists:any[];
  @Input() defaultPagingNumber:number;
  @Input() pagingOption:any[];
  @Output() selectItem = new EventEmitter();

  public selectLists:any[] = [];
  public isShowMessage:boolean = false;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    this.selectLists = [];
  }

  onRowSelect() {
    if (this.selectLists.length > 3) {
      this.isShowMessage = true;
      this.selectLists.pop();
    }
    this.selectItem.emit(this.selectLists);
  }
}
