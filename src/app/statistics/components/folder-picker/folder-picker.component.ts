/**
 * Created by GRE511 on 2018-08-27.
 */
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'folder-picker',
  templateUrl: 'folder-picker.component.html'})

export class FolderPickerComponent implements OnInit {
  public folderArray: any[] = [
    { label:'전체 폴더', value: 0 },
    { label:'폴더1', value: 1 },
    { label:'폴더2', value: 2 },
  ];
  public selectedFolder:any;
  @Output() onSelect = new EventEmitter<Object>();

  constructor() {
  }

  ngOnInit() {}

  changeSelectFolder() {
    let folderData:object;
    this.folderArray.forEach((item) => {
      if (item.value === this.selectedFolder) {
        folderData = item;
      }
    });
    this.onSelect.emit(folderData);
  }
}
