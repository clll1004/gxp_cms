/**
 * Created by GRE511 on 2019-01-23.
 */
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'account',
  templateUrl: './account.component.html'})

export class AccountComponent implements OnInit {
  public tabMenuItems: MenuItem[];
  public params:Params;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });

    this.tabMenuItems = [
      { label: '계정정보', routerLink: ['/settings/account/info'] },
      { label: '관리자 설정', routerLink: ['/settings/account/admin'] },
      { label: '서비스 관리', routerLink: ['/settings/account/service'] },
      { label: '결제 관리', routerLink: ['/settings/account/payment'] },
    ];
  }
}
