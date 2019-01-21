/**
 * Created by GRE511 on 2019-01-08.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BreadcrumbService } from '../../../../breadcrumb.service';
import { PlayListService } from '../../../service/playList.service';

@Component({
  selector: 'play-list',
  styleUrls: ['./play-list.component.css'],
  templateUrl: './play-list.component.html'})

export class PlayListComponent implements OnInit {
  public params:Params;

  public playListList:any = [];
  public selectedPlayList: any = 'all';

  public playListCols:any[] = [
    { header: 'CID', field: 'ft_seq', width: '5%' },
    { header: '썸네일', field: 'ft_thumb_path', width: '10%' },
    { header: '미디어보관함', field: 'pl_nm', width: '10%' },
    { header: '영상 제목', field: 'title', width: '10%' },
    { header: '파일명', field: 'ft_nm', width: '15%' },
    { header: '파일형태', field: 'filetype', width: '7%' },
    { header: '크기', field: 'ft_size', width: '5%' },
    { header: '등록일시', field: 'ft_reg_dtm', width: '15%' },
    { header: '상태', field: 'ft_status', width: '5%' },
  ];
  public playListRowData:any[] = [];
  public transCodingStatusValue: object = {
    U: '업로드 완료',
    TR: '변환 요청',
    OF: '원본전송실패',
    TT: '변환중',
    TF: '변환실패',
    SF: '배포실패',
    SS: '완료' };
  public tempItems:any[] = [];

  public playListSettingCols:any[] = [
    { header: '재생목록', field: 'pl_nm' },
    { header: '콘텐츠 수', field: 'content_cnt' },
    { header: '크기', field: 'content_size' },
    { header: '서비스상태', field: 'service_status' },
    { header: '등록일시', field: 'pl_reg_dtm' },
    { header: '수정일시', field: 'updated_at' },
  ];
  public playListSettingOriginData:any[] = [];
  public playListSettingRowData:any[] = [];
  public selectSettingItems:any[] = [];
  public rowIndex:number = 0;

  public settingDialog:boolean = false;
  public moveDialog:boolean = false;
  public notSelectDialog:boolean = false;

  public selectedMovePlayList:any = 'transmitAd';

  public statusOption:any[] = [{ label: 'ON', value: 'ON' }, { label: 'OFF', value: 'OFF' }];

  constructor(private activatedRoute: ActivatedRoute, private breadcrumbService: BreadcrumbService, private playListService: PlayListService) {
    this.breadcrumbService.setItems([
      { label: '재생목록', routerLink: ['/playList'] },
    ]);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });

    this.load();
  }

  load() {
    this.loadPlayListTitle();
    this.loadPlayList();
  }

  loadPlayListTitle() {
    this.playListService.getPlayListTitle()
      .then((cont) => {
        this.playListList = cont['list'].map((item) => {
          const temp:object = {};
          temp['label'] = item.title;
          temp['value'] = item.pl_seq;
          return temp;
        });
        this.playListList.unshift({
          label: '전체',
          value: 'all',
        });
        this.selectedPlayList = 'all';
      });
  }

  loadPlayList(seq:any = 'all') {
    this.playListService.getPlayList(seq)
      .then((cont) => {
        this.playListRowData = cont['list'];
        this.playListRowData.reverse();
        this.playListRowData.forEach((item) => {
          this.transCodingStatusValue.hasOwnProperty(item.fo_status) ? item.fo_status = this.transCodingStatusValue[item.fo_status] : item.fo_status = 'null';
        });
      });
  }

  closePopup() {
    this.settingDialog = false;
    this.moveDialog = false;
    this.notSelectDialog = false;
  }

  movePlayList() {
    this.tempItems.length !== 0 ? this.moveDialog = true : this.notSelectDialog = true;
  }

  /* 재생목록 관리 팝업 */
  loadSettingPlayList() {
    this.playListService.getSettingPlayList()
      .then((cont) => {
        this.playListSettingOriginData = cont['list'];
        this.playListSettingRowData = this.playListSettingOriginData;
        this.playListSettingRowData.forEach((item) => {
          item.mode = 'normal';
        });
      });
  }

  updatePlayList() {
    const valueArray:any[] = [];
    this.playListSettingRowData.forEach((item) => {
      if (item.pl_nm !== '') {
        const temp:object = { pl_seq: '', pl_nm: '', service_status: '' };
        temp['pl_seq'] = item.pl_seq;
        temp['pl_nm'] = item.pl_nm;
        temp['service_status'] = item.service_status;
        valueArray.push(temp);
      }
    });
    this.playListService.postPlayList(valueArray)
      .then(() => {
        this.settingDialog = false;
      });
  }

  addPlayList() {
    this.playListSettingRowData.unshift({ rowIndex: `add${this.rowIndex}`, mode: 'add', pl_seq: '', pl_nm: '', service_status: 'ON' });
    this.rowIndex += 1;
  }

  deletePlayList() {
    if (this.selectSettingItems.length === 0) {
      return false;
    }
    console.log(this.selectSettingItems);
    const deleteSeqArray:any[] = [];
    this.selectSettingItems.forEach((item) => {
      item.mode === 'add' ? deleteSeqArray.push(item.rowIndex) : deleteSeqArray.push(item.pl_seq);
    });
    deleteSeqArray.forEach((seq) => {
      for (let i = 0 ; i < this.playListSettingRowData.length ; i += 1) {
        if (this.playListSettingRowData[i].pl_seq === seq || this.playListSettingRowData[i].rowIndex === seq) {
          this.playListSettingRowData.splice(i, 1);
        }
      }
    });
    this.selectSettingItems = [];
  }

  modifyPlayList() {
    if (this.selectSettingItems.length === 0) {
      return false;
    }
    const modifySeqArray:any[] = [];
    this.selectSettingItems.forEach((item) => {
      if (item.mode === 'normal') {
        modifySeqArray.push(item.pl_seq);
      }
    });
    modifySeqArray.forEach((seq) => {
      for (let i = 0 ; i < this.playListSettingRowData.length ; i += 1) {
        if (this.playListSettingRowData[i].pl_seq === seq) {
          this.playListSettingRowData[i].mode = 'modify';
        }
      }
    });
    this.selectSettingItems = [];
  }

  switchStatus() {
    if (this.selectSettingItems.length === 0) {
      return false;
    }
    const switchStatusSeqArray:any[] = [];
    this.selectSettingItems.forEach((item) => {
      switchStatusSeqArray.push(item.pl_seq);
    });
    switchStatusSeqArray.forEach((seq) => {
      for (let i = 0 ; i < this.playListSettingRowData.length ; i += 1) {
        if (this.playListSettingRowData[i].pl_seq === seq) {
          this.playListSettingRowData[i].service_status === 'ON' ? this.playListSettingRowData[i].service_status = 'OFF' : this.playListSettingRowData[i].service_status = 'ON';
        }
      }
    });
    this.selectSettingItems = [];
  }
}

