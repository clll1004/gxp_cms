/**
 * Created by GRE511 on 2019-01-17.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../../../breadcrumb.service';

@Component({
  selector: 'transmit-list',
  styleUrls: ['../../../../../interactive-service.component.css'],
  templateUrl: './transmit-list.component.html'})

export class TransmitListComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-chat/list'] },
      { label: '실시간 광고 전송', routerLink: ['/interactive-service/ad-manage/manager/manager-list'] },
      { label: '광고 전송', routerLink: ['/interactive-service/ad-manage/transmit/transmit-list'] },
    ]);
  }

  ngOnInit() {
  }
}
