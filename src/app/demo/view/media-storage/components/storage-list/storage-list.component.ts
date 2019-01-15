/**
 * Created by GRE511 on 2019-01-09.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../breadcrumb.service';
import { MediaStorageService } from '../../../../../demo/service/mediaStorageService';

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
    { header: '파일형태', field: 'filetype', width: '5%' },
    { header: '크기', field: 'fo_size', width: '5%' },
    { header: '변환상태', field: 'fo_status', width: '5%' },
    { header: '등록일시', field: 'fo_reg_dtm', width: '15%' },
  ];
  public mediaStorageRowData:any[] = [];
  public transCodingStatusValue: object = {
    U: '업로드 완료',
    TR: '변환 요청',
    OF: '원본전송실패',
    TT: '변환중',
    TF: '변환실패',
    SF: '배포실패',
    SS: '완료' };
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
          temp['value'] = item.title;
          return temp;
        });
        this.storageList.unshift({
          label: '전체',
          value: 'all',
        });
        this.selectedStorage = 'all';
      });
  }

  loadMediaStorageList() {
    this.mediaStorageService.getStorageList()
      .then((cont) => {
        this.mediaStorageRowData = cont['list'];
        this.mediaStorageRowData.reverse();
        this.mediaStorageRowData.forEach((item) => {
          this.transCodingStatusValue.hasOwnProperty(item.fo_status) ? item.fo_status = this.transCodingStatusValue[item.fo_status] : item.fo_status = 'null';
        });
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
}

