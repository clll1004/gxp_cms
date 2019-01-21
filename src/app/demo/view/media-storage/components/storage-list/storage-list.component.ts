/**
 * Created by GRE511 on 2019-01-09.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../breadcrumb.service';
import { MediaStorageService } from '../../../../service/mediaStorage.service';

@Component({
  selector: 'storage-list',
  styleUrls: ['../media-storage.component.css'],
  templateUrl: './storage-list.component.html'})

export class StorageListComponent implements OnInit {
  public originStorageList:any = [];
  public storageList:any = [];
  public selectedStorage:any = 'all';

  public mediaStorageCols:any[] = [
    { header: 'CID', field: 'fo_seq', width: '5%' },
    { header: '썸네일', field: 'fo_thumb_path', width: '10%' },
    { header: '미디어보관함', field: 'gf_nm', width: '10%' },
    { header: '영상 제목', field: 'title', width: '10%' },
    { header: '파일명', field: 'fo_nm', width: '15%' },
    { header: '파일형태', field: 'filetype', width: '7%' },
    { header: '크기', field: 'fo_size', width: '5%' },
    { header: '변환상태', field: 'status', width: '7%' },
    { header: '등록일시', field: 'fo_reg_dtm', width: '15%' },
  ];
  public mediaStorageRowData:any[] = [];
  public tempSelectItems:any[] = [];

  public mediaSettingCols:any[] = [
    { header: '미디어보관함 명', field: 'gf_nm' },
    { header: '콘텐츠 수', field: 'content_cnt' },
    { header: '크기', field: 'content_size' },
    { header: '등록일시', field: 'gf_reg_dtm' },
    { header: '수정일시', field: 'updated_at' },
  ];
  public mediaSettingOriginData:any[] = [];
  public mediaSettingRowData:any[] = [];
  public selectSettingItems:any[] = [];

  public settingDialog:boolean = false;
  public moveDialog:boolean = false;
  public notSelectDialog:boolean = false;
  public rowIndex:number = 0;

  public selectedMoveStorage:any = '';

  constructor(private breadcrumbService: BreadcrumbService, private mediaStorageService: MediaStorageService) {
    this.breadcrumbService.setItems([
      { label: '미디어보관함', routerLink: ['/media-storage'] },
    ]);
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loadMediaStorageListTitle();
    this.loadMediaStorageList();
  }

  loadMediaStorageListTitle() {
    this.mediaStorageService.getStorageListTitle()
      .then((cont) => {
        this.originStorageList = cont['list'].map((item) => {
          const temp:object = {};
          temp['label'] = item.title;
          temp['value'] = item.gf_seq;
          return temp;
        });
        this.selectedMoveStorage = this.originStorageList[0].value;
        this.storageList = this.originStorageList.slice();
        this.storageList.unshift({
          label: '전체',
          value: 'all',
        });
        this.selectedStorage = 'all';
      });
  }

  loadMediaStorageList(seq:any = 'all') {
    this.mediaStorageService.getStorageList(seq)
      .then((cont) => {
        this.mediaStorageRowData = cont['list'];
        this.mediaStorageRowData.reverse();
      });
  }

  closePopup() {
    this.settingDialog = false;
    this.moveDialog = false;
    this.notSelectDialog = false;
  }

  hasSelectItem() {
    this.tempSelectItems.length !== 0 ? this.moveDialog = true : this.notSelectDialog = true;
  }

  moveMediaStorage() {
    const valueArray:any[] = [];
    this.tempSelectItems.forEach((item) => {
      valueArray.push({ 'fo_seq': item.fo_seq });
    });
    this.mediaStorageService.moveStorage(this.selectedMoveStorage, valueArray)
      .then(() => {
        this.moveDialog = false;
        this.tempSelectItems = [];
        this.loadMediaStorageList();
      });
  }

  /* 미디어 보관함 관리 팝업*/
  loadMediaStorage() {
    this.mediaStorageService.getStorage()
      .then((cont) => {
        this.mediaSettingOriginData = cont['list'];
        this.mediaSettingRowData = this.mediaSettingOriginData;
        this.mediaSettingRowData.forEach((item) => {
          item.mode = 'normal';
        });
      });
  }

  updateMediaStorage() {
    const valueArray:any[] = [];
    this.mediaSettingRowData.forEach((item) => {
      if (item.gf_nm !== '') {
        const temp:object = { gf_seq: '', gf_nm: '' };
        temp['gf_seq'] = item.gf_seq;
        temp['gf_nm'] = item.gf_nm;
        valueArray.push(temp);
      }
    });
    this.mediaStorageService.postStorage(valueArray)
      .then(() => {
        this.settingDialog = false;
      });
  }

  addMediaStorage() {
    this.mediaSettingRowData.unshift({ rowIndex: `add${this.rowIndex}`, mode: 'add', gf_seq: '', gf_nm: '' });
    this.rowIndex += 1;
  }

  deleteMediaStorage() {
    if (this.selectSettingItems.length === 0) {
      return false;
    }
    const deleteSeqArray:any[] = [];
    this.selectSettingItems.forEach((item) => {
      item.mode === 'add' ? deleteSeqArray.push(item.rowIndex) : deleteSeqArray.push(item.gf_seq);
    });
    deleteSeqArray.forEach((seq) => {
      for (let i = 0 ; i < this.mediaSettingRowData.length ; i += 1) {
        if (this.mediaSettingRowData[i].gf_seq === seq || this.mediaSettingRowData[i].rowIndex === seq) {
          this.mediaSettingRowData.splice(i, 1);
        }
      }
    });
  }

  modifyMediaStorage() {
    if (this.selectSettingItems.length === 0) {
      return false;
    }
    const modifySeqArray:any[] = [];
    this.selectSettingItems.forEach((item) => {
      if (item.mode === 'normal') {
        modifySeqArray.push(item.gf_seq);
      }
    });
    modifySeqArray.forEach((seq) => {
      for (let i = 0 ; i < this.mediaSettingRowData.length ; i += 1) {
        if (this.mediaSettingRowData[i].gf_seq === seq) {
          this.mediaSettingRowData[i].mode = 'modify';
        }
      }
    });
  }
}

