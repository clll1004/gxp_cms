/**
 * Created by GRE511 on 2019-01-30.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../breadcrumb.service';

@Component({
  selector: 'user-manager',
  styleUrls: ['../sAdmin.component.css'],
  templateUrl: './user-manager.component.html'})

export class UserManagerComponent implements OnInit {
  public userCols:any[] = [
    { header: '회원이름', field: 'name' },
    { header: '이메일', field: 'email' },
    { header: '고객사명', field: 'companyName' },
    { header: '사용 중 서비스', field: 'usingService' },
    { header: '가입일', field: 'createdAt' },
    { header: '회원구분', field: 'userType' },
    { header: '탈퇴여부', field: 'forWithdrawal' },
  ];
  public userRowData:any[] = [];
  public tempItems:any[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '회원관리', routerLink: ['/admin/user-manager'] },
    ]);
  }

  ngOnInit() {
  }
}
