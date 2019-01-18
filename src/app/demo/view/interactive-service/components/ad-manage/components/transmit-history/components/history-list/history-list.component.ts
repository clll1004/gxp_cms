/**
 * Created by GRE511 on 2019-01-18.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../../../breadcrumb.service';

@Component({
  selector: 'history-list',
  styleUrls: ['../../../../../interactive-service.component.css'],
  templateUrl: './history-list.component.html'})

export class HistoryListComponent implements OnInit {
  public transmitHistoryCols:any[] = [
    { field: 'ad', header: '광고' },
    { field: 'title', header: '광고명' },
    { field: 'transmitCount', header: '전송수' },
    { field: 'transmitDate', header: '전송일시' },
    { field: 'open', header: '열람' },
    { field: 'notOpen', header: '미열람' },
    { field: 'failed', header: '실패' },
  ];
  public transmitHistoryRowData:any[] = [
    { ad: 'http://str.gomgxp.com/thail/GXP/2018/fLayoutTest/KakaoTalk_Video_20170612_1744_48_996/KakaoTalk_Video_20170612_1744_48_9960001.jpg', title: '후기작성알림', transmitCount: '5', transmitDate: '2018-05-30 05:30:22', open: '4', notOpen: '3', failed: '2' },
    { ad: 'http://str.gomgxp.com/thail/GXP/2018/fLayoutTest/KakaoTalk_Video_20170612_1744_48_996/KakaoTalk_Video_20170612_1744_48_9960001.jpg', title: '후기작성알림', transmitCount: '5', transmitDate: '2018-05-30 05:30:22', open: '4', notOpen: '3', failed: '2' },
    { ad: 'http://str.gomgxp.com/thail/GXP/2018/fLayoutTest/KakaoTalk_Video_20170612_1744_48_996/KakaoTalk_Video_20170612_1744_48_9960001.jpg', title: '후기작성알림', transmitCount: '5', transmitDate: '2018-05-30 05:30:22', open: '4', notOpen: '3', failed: '2' },
  ];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-chat/list'] },
      { label: '실시간 광고 전송', routerLink: ['/interactive-service/ad-manage/manager/manager-list'] },
      { label: '전송 이력', routerLink: ['/interactive-service/ad-manage/transmit-history/history-list'] },
    ]);
  }

  ngOnInit() {
  }
}
