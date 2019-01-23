/**
 * Created by GRE511 on 2019-01-23.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';

@Component({
  selector: 'admin',
  styleUrls: ['../../../settings.component.css'],
  templateUrl: './admin.component.html'})

export class AdminComponent implements OnInit {
  public adminCols:any[] = [
    { header: 'CMS ID', field: 'cmsId' },
    { header: '이름', field: 'name' },
    { header: '이메일 주소', field: 'email' },
    { header: '연락처', field: 'phone' },
    { header: '등록일시', field: 'regDate' },
  ];
  public adminRowData:any[] = [];
  public tempSelectItems:any[] = [];

  public addAdminDialog:boolean = false;

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '설정', routerLink: ['/settings/account/info'] },
      { label: '계정설정', routerLink: ['/settings/account/info'] },
      { label: '관리자 설정', routerLink: ['/settings/account/admin'] },
    ]);
  }

  ngOnInit() {
  }

  closePopup() {
    this.addAdminDialog = false;
  }

  addAdmin() {

  }
}
