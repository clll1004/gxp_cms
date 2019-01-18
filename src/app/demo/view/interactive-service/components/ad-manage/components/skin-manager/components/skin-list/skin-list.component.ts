/**
 * Created by GRE511 on 2019-01-18.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../../../breadcrumb.service';

@Component({
  selector: 'skin-list',
  styleUrls: ['../../../../../interactive-service.component.css'],
  templateUrl: './skin-list.component.html'})

export class SkinListComponent implements OnInit {
  public skinCols:any[] = [
    { header: '스킨', field: 'skin', width: '200px' },
    { header: '스킨명', field: 'title' },
    { header: '적용 영상수', field: 'contentsCount' },
    { header: '상태', field: 'status' },
    { header: '시작일', field: 'startDate' },
    { header: '종료일', field: 'endDate' },
    { header: '등록일시', field: 'regDate' },
    { header: '최종수정일시', field: 'updateAt' },
  ];
  public skinRowData:any[] = [
    { seq: 0, skin: 'http://str.gomgxp.com/thail/GXP/2018/fLayoutTest/KakaoTalk_Video_20170612_1744_48_996/KakaoTalk_Video_20170612_1744_48_9960001.jpg', title: '강사안내', contentsCount: '100', status: 'ON', startDate: '2018.10.23', endDate: '2018.10.23', regDate: '2018.10.23', updateAt: '2018.10.23' },
    { seq: 1, skin: 'http://str.gomgxp.com/thail/GXP/2018/fLayoutTest/KakaoTalk_Video_20170612_1744_48_996/KakaoTalk_Video_20170612_1744_48_9960001.jpg', title: '기본스킨', contentsCount: '100', status: 'ON', startDate: '2018.10.23', endDate: '2018.10.23', regDate: '2018.10.23', updateAt: '2018.10.23' },
    { seq: 2, skin: 'http://str.gomgxp.com/thail/GXP/2018/fLayoutTest/KakaoTalk_Video_20170612_1744_48_996/KakaoTalk_Video_20170612_1744_48_9960001.jpg', title: '월말스킨', contentsCount: '100', status: 'ON', startDate: '2018.10.23', endDate: '2018.10.23', regDate: '2018.10.23', updateAt: '2018.10.23' },
  ];
  public tempItems:any[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-chat/list'] },
      { label: '실시간 광고 전송', routerLink: ['/interactive-service/ad-manage/manager/manager-list'] },
      { label: '스킨관리', routerLink: ['/interactive-service/ad-manage/skin-manager/skin-list'] },
    ]);
  }

  ngOnInit() {
  }
}
