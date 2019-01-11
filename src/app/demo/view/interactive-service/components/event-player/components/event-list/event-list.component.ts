/**
 * Created by GRE511 on 2019-01-11.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';

@Component({
  selector: 'event-list',
  styleUrls: ['../../../interactive-service.component.css'],
  templateUrl: './event-list.component.html'})

export class EventListComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-chat/list'] },
      { label: '이벤트 플레이어', routerLink: ['/interactive-service/event-player/list'] },
    ]);
  }

  ngOnInit() {
  }
}
