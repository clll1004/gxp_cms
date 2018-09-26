/**
 * Created by GRE511 on 2018-08-27.
 */
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoginService } from '../../../login/login.service';
import { ChartService } from '../../../services/apis/cms/chart/chart.service';
import { CmsApis } from '../../../services/apis/apis';

@Component({
  selector: 'folder-picker',
  templateUrl: 'folder-picker.component.html',
  providers: [LoginService, ChartService, CmsApis]})

export class FolderPickerComponent implements OnInit {
  public folderArray: any[] = [];
  public selectedFolder:any;
  public userSeq:string = '';
  @Output() onSelect = new EventEmitter<Object>();

  constructor(private loginService: LoginService, private chartService: ChartService, private cmsApi: CmsApis) {}

  ngOnInit() {
    this.userSeq = this.loginService.getCookie('usr_seq');
    this.chartService.getLists(this.cmsApi.loadCategoryKey + this.userSeq)
      .then((cont) => {
        cont['list'].unshift({
          key: '',
          value: '카테고리 선택',
        });
        this.folderArray = cont['list'].map((item) => {
          const temp:object = {};
          temp['label'] = item.value;
          temp['value'] = item.key;
          return temp;
        });
      });
  }

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
