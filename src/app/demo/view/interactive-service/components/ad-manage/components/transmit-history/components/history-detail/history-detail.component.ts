/**
 * Created by GRE511 on 2019-01-18.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../../../breadcrumb.service';

@Component({
  selector: 'history-detail',
  styleUrls: ['../../../../../interactive-service.component.css'],
  templateUrl: './history-detail.component.html'})

export class HistoryDetailComponent implements OnInit {
  public historyData:object = {
    title: '후기작성알림',
    thumb: 'http://str.gomgxp.com/thail/GXP/2018/fLayoutTest/KakaoTalk_Video_20170612_1744_48_996/KakaoTalk_Video_20170612_1744_48_9960001.jpg',
  };
  public historyDetailCols:any[] = [
    { field: 'mediaStorage', header: '미디어보관함' },
    { field: 'title', header: '영상제목' },
    { field: 'addressID', header: '수신인 ID' },
    { field: 'date', header: '전송일시' },
    { field: 'status', header: '전송상태' },
    { field: 'result', header: '전송결과' },
    { field: 'openDate', header: '열람일' },
  ];
  public historyDetailRowData:any[] = [
    { mediaStorage: '중등교육', title: '중1 영어1강', addressID: 'clll1004', date: '2018-05-30 05:30:22', status: '전송완료', result: '열람', openDate: '2018-05-30 05:30:22' },
    { mediaStorage: '자격증', title: '중1 영어1강', addressID: 'clll1004', date: '2018-05-30 05:30:22', status: '전송완료', result: '열람', openDate: '2018-05-30 05:30:22' },
    { mediaStorage: '고등교육', title: '중1 영어1강', addressID: 'clll1004', date: '2018-05-30 05:30:22', status: '전송완료', result: '열람', openDate: '2018-05-30 05:30:22' },
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
