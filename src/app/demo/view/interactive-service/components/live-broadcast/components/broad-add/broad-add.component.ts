/**
 * Created by GRE511 on 2019-01-11.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';

@Component({
  selector: 'broad-add',
  templateUrl: './broad-add.component.html'})

export class BroadAddComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-broadcast/list'] },
      { label: '라이브방송', routerLink: ['/interactive-service/live-broadcast/list'] },
      { label: '등록', routerLink: ['/interactive-service/live-broadcast/add'] },
    ]);
  }

  ngOnInit() {
  }
}
