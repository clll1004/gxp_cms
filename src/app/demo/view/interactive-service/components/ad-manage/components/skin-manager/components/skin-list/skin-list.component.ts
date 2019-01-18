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
