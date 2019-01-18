/**
 * Created by GRE511 on 2019-01-17.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../../../breadcrumb.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'transmit-detail',
  styleUrls: ['../../../../../interactive-service.component.css'],
  templateUrl: './transmit-detail.component.html'})

export class TransmitDetailComponent implements OnInit {
  public adTransmitForm:FormGroup;
  public searchDialog:boolean = false;

  public contentsRowData:any[] = [
    { seq: 0, storage: '중1COS1700005C324234', contentsName: '중1 영어 1강', fileName: 'COS1700005' },
    { seq: 1, storage: '중2', contentsName: '중1 영어 1강', fileName: 'COS1700005' },
    { seq: 2, storage: '중3', contentsName: '중1 영어 1강', fileName: 'COS1700005' },
    { seq: 3, storage: '중1', contentsName: '중1 영어 1강', fileName: 'COS1300005' },
    { seq: 4, storage: '중2', contentsName: '중2 영어 1강', fileName: 'COS1700005' },
    { seq: 5, storage: '중3', contentsName: '중3 영어 1강', fileName: 'COS1700005' },
    { seq: 6, storage: '중1', contentsName: '중1 영어 1강', fileName: 'COS2700005' },
    { seq: 7, storage: '중2', contentsName: '중1 영어 1강', fileName: 'COS3700005' },
    { seq: 8, storage: '중3', contentsName: '중1 영어 1강', fileName: 'COS4700005' },
    { seq: 9, storage: '중1', contentsName: '중1 영어 1강', fileName: 'COS5700005' },
    { seq: 10, storage: '중2', contentsName: '중1 영어 1강', fileName: 'COS6700005' },
    { seq: 11, storage: '중3', contentsName: '중1 영어 1강', fileName: 'COS7700005' },
  ];
  public selectContentsRowData:any[] = [];

  public selectContentsCols:any[] = [
    { field: 'storage', header: '미디어보관함' },
    { field: 'contentsName', header: '콘텐츠명' },
    { field: 'fileName', header: '파일명' },
  ];
  public tempDeleteItems:any[] = [];

  constructor(private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-chat/list'] },
      { label: '실시간 광고 전송', routerLink: ['/interactive-service/ad-manage/manager/manager-list'] },
      { label: '광고 전송', routerLink: ['/interactive-service/ad-manage/transmit/transmit-list'] },
    ]);
  }

  ngOnInit() {
    this.adTransmitForm = this.formBuilder.group({
      adName: new FormControl('후기작성알림'),
      adSrc:new FormControl('http://str.gomgxp.com/thail/GXP/2018/fLayoutTest/KakaoTalk_Video_20170612_1744_48_996/KakaoTalk_Video_20170612_1744_48_9960001.jpg'),
      adType: new FormControl('viewingTime'),
    });
  }

  onSubmit(value: any) {
    console.log(value);
  }

  closePopup() {
    this.searchDialog = false;
  }

  deleteSelectItem() {
    if (this.tempDeleteItems.length === 0) {
      return false;
    }
    const deleteSeqArray:any[] = [];
    this.tempDeleteItems.forEach((item) => {
      deleteSeqArray.push(item.seq);
    });
    deleteSeqArray.forEach((seq) => {
      for (let i = 0 ; i < this.selectContentsRowData.length ; i += 1) {
        if (this.selectContentsRowData[i].seq === seq) {
          this.selectContentsRowData.splice(i, 1);
        }
      }
    });
  }
}
