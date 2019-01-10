/**
 * Created by GRE511 on 2019-01-10.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../breadcrumb.service';

@Component({
  selector: 'remote-control',
  templateUrl: './remote-control.component.html'})

export class RemoteControlComponent implements OnInit {

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/remote-control'] },
      { label: '리모콘 연결관리', routerLink: ['/interactive-service/remote-control'] },
    ]);
  }

  ngOnInit() {
  }
}
