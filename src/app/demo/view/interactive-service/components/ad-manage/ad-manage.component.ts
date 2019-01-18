/**
 * Created by GRE511 on 2019-01-16.
 */
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'ad-manage',
  templateUrl: './ad-manage.component.html'})

export class AdManageComponent implements OnInit {
  public tabMenuItems: MenuItem[];
  public params:Params;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });

    this.tabMenuItems = [
      { label: '광고관리', routerLink: ['/interactive-service/ad-manage/manager/manager-list'] },
      { label: '광고전송', routerLink: ['/interactive-service/ad-manage/transmit/transmit-list'] },
      { label: '전송이력', routerLink: ['/interactive-service/ad-manage/transmit-history/history-list'] },
      { label: '스킨관리', routerLink: ['/interactive-service/ad-manage/skin-manager/skin-list'] },
    ];
  }
}
