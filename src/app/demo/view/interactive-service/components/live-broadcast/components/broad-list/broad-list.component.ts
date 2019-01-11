/**
 * Created by GRE511 on 2019-01-11.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';

@Component({
  selector: 'broad-list',
  templateUrl: './broad-list.component.html'})

export class BroadListComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-broadcast/list'] },
      { label: '라이브방송', routerLink: ['/interactive-service/live-broadcast/list'] },
    ]);
  }

  ngOnInit() {
  }
}
