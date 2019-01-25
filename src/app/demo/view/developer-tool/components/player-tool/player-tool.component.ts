/**
 * Created by GRE511 on 2019-01-25.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../breadcrumb.service';

@Component({
  selector: 'player-tool',
  templateUrl: './player-tool.component.html'})

export class PlayerToolComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '개발자도구', routerLink: ['/developer-tool/encoding'] },
      { label: '플레이어', routerLink: ['/developer-tool/player'] },
    ]);
  }

  ngOnInit() {
  }
}
