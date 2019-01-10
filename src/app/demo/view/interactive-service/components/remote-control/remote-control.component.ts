/**
 * Created by GRE511 on 2019-01-10.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../breadcrumb.service';

@Component({
  selector: 'remote-control',
  styleUrls: ['../interactive-service.component.css'],
  templateUrl: './remote-control.component.html'})

export class RemoteControlComponent implements OnInit {
  public rangeDates:Date[] = [new Date(), new Date()];

  public remoteControlCols:any[] = [
    { header: '연결일시', field: 'startRemote' },
    { header: '연결 종료일시', field: 'endRemote' },
    { header: '연결 기기', field: 'remoteTarget' },
    { header: '회원ID', field: 'userId' },
    { header: '회원이름', field: 'userName' },
    { header: '총 연결 횟수', field: 'totalRemoteCount' },
  ];
  public remoteControlRowData:any[] = [
    { startRemote: '2018-05-30 05:30:22', endRemote: '2018-05-30 05:30:22', remoteTarget: 'IDFAF32DFAS', userId: 'aaa', userName: '김원', totalRemoteCount: '3' },
    { startRemote: '2018-05-30 05:30:22', endRemote: '2018-05-30 05:30:22', remoteTarget: 'IDFAF32DFAS', userId: 'aaa', userName: '김원', totalRemoteCount: '3' },
    { startRemote: '2018-05-30 05:30:22', endRemote: '2018-05-30 05:30:22', remoteTarget: 'IDFAF32DFAS', userId: 'aaa', userName: '김원', totalRemoteCount: '3' },
  ];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-chat/list'] },
      { label: '리모콘 연결 관리', routerLink: ['/interactive-service/remote-control'] },
    ]);
  }

  ngOnInit() {
  }
}
