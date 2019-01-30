/**
 * Created by GRE511 on 2019-01-30.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../breadcrumb.service';

@Component({
  selector: 'license-manager',
  styleUrls: ['../sAdmin.component.css'],
  templateUrl: './license-manager.component.html'})

export class LicenseManagerComponent implements OnInit {
  public licenseCols:any[] = [
    { header: '고객사명', field: 'clientName' },
    { header: '인증키', field: 'licenseKey' },
    { header: '도메인', field: 'domain' },
    { header: '인증키 상태', field: 'status' },
    { header: '발급일시', field: 'createdAt' },
    { header: '최종 수정일시', field: 'updatedAt' },
  ];
  public licenseRowData:any[] = [];
  public tempItems:any[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '인증키관리', routerLink: ['/admin/license-manager'] },
    ]);
  }

  ngOnInit() {
  }
}
