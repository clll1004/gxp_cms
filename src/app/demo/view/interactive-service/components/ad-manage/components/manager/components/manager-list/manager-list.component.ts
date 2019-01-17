/**
 * Created by GRE511 on 2019-01-16.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../../../breadcrumb.service';

@Component({
  selector: 'manager-list',
  styleUrls: ['../../../../../interactive-service.component.css'],
  templateUrl: './manager-list.component.html'})

export class ManagerListComponent implements OnInit {
  public managerCols:any[] = [
    { header: '광고', field: 'ad', width: '200px' },
    { header: '제목', field: 'title' },
    { header: '등록일시', field: 'regDate' },
    { header: '최종 수정일시', field: 'updateAt' },
  ];
  public managerRowData:any[] = [
    { ad: 'http://str.gomgxp.com/thail/GXP/2018/fLayoutTest/KakaoTalk_Video_20170612_1744_48_996/KakaoTalk_Video_20170612_1744_48_9960001.jpg', title: '광고01', regDate: '2018.10.23', updateAt: '2018.10.23' },
    { ad: 'http://str.gomgxp.com/thail/GXP/2018/fLayoutTest/KakaoTalk_Video_20170612_1744_48_996/KakaoTalk_Video_20170612_1744_48_9960001.jpg', title: '광고02', regDate: '2018.10.23', updateAt: '2018.10.23' },
    { ad: 'http://str.gomgxp.com/thail/GXP/2018/fLayoutTest/KakaoTalk_Video_20170612_1744_48_996/KakaoTalk_Video_20170612_1744_48_9960001.jpg', title: '광고03', regDate: '2018.10.23', updateAt: '2018.10.23' },
  ];
  public tempCompareItems:any[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-chat/list'] },
      { label: '실시간 광고 전송', routerLink: ['/interactive-service/ad-manage/manager/manager-list'] },
      { label: '광고 관리', routerLink: ['/interactive-service/ad-manage/manager/manager-list'] },
    ]);
  }

  ngOnInit() {
  }
}
