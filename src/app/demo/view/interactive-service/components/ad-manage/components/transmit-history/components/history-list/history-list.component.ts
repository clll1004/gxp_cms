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
