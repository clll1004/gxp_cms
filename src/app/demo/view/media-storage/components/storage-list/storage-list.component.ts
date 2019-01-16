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
  public tempCompareItems:any[] = [];

  public mediaSettingCols:any[] = [
    { header: '미디어보관함 명', field: 'mediaStorage' },
    { header: '콘텐츠 수', field: 'contentsCount' },
    { header: '크기', field: 'fileSize' },
    { header: '등록일시', field: 'regdate' },
    { header: '수정일시', field: 'updateDate' },
  ];
  public mediaSettingRowData:any[] = [
    { index: 0, mediaStorage: '중학교 1학년 영어', contentsCount: '10', fileSize: '150', regdate: '2018.10.16', updateDate: '2018.10.16' },
    { index: 1, mediaStorage: '중학교 1학년 국어', contentsCount: '10', fileSize: '150', regdate: '2018.10.16', updateDate: '2018.10.16' },
  ];
  public selectSettingItems:any[] = [];
  public rowIndex:number = 2;

  public settingDialog:boolean = false;
  public moveDialog:boolean = false;
  public notSelectDialog:boolean = false;

  public selectedMoveStorage:any = 'transmitAd';

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
        this.storageList = cont['list'].map((item) => {
          const temp:object = {};
          temp['label'] = item.title;
          temp['value'] = item.gf_seq;
          return temp;
        });
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

  moveStorage() {
    this.tempCompareItems.length !== 0 ? this.moveDialog = true : this.notSelectDialog = true;
  }

  addMediaStorage() {
    const today = new Date();
    const convertDate = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`;
    this.mediaSettingRowData.unshift({ index: this.rowIndex, mediaStorage: '', contentsCount: '-', fileSize: '-', regdate: convertDate, updateDate: convertDate });
    this.rowIndex += 1;
  }
}

