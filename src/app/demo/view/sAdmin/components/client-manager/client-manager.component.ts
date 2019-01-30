/**
 * Created by GRE511 on 2019-01-30.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../breadcrumb.service';

@Component({
  selector: 'client-manager',
  styleUrls: ['../sAdmin.component.css'],
  templateUrl: './client-manager.component.html'})

export class ClientManagerComponent implements OnInit {
  public clientCols:any[] = [
    { header: '고객사명', field: 'clientName' },
    { header: '사용 중 서비스', field: 'usingService' },
    { header: '서비스 시작일', field: 'sdate' },
    { header: '서비스 종료일', field: 'edate' },
    { header: '상태', field: 'status' },
    { header: '회원구분', field: 'userType' },
  ];
  public clientRowData:any[] = [];
  public tempItems:any[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '고객사관리', routerLink: ['/admin/client-manager'] },
    ]);
  }

  ngOnInit() {
  }
}
