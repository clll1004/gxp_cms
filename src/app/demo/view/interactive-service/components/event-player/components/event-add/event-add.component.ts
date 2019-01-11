/**
 * Created by GRE511 on 2019-01-11.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';

@Component({
  selector: 'event-add',
  styleUrls: ['../../../interactive-service.component.css'],
  templateUrl: './event-add.component.html'})

export class EventAddComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-chat/list'] },
      { label: '이벤트 플레이어', routerLink: ['/interactive-service/event-player/list'] },
    ]);
  }

  ngOnInit() {
  }
}
