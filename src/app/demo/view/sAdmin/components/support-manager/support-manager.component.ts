/**
 * Created by GRE511 on 2019-01-30.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../breadcrumb.service';

@Component({
  selector: 'support-manager',
  styleUrls: ['../sAdmin.component.css'],
  templateUrl: './support-manager.component.html'})

export class SupportManagerComponent implements OnInit {
  public supportCols:any[] = [
    { header: '제목', field: 'title' },
    { header: '담당자', field: 'charge' },
    { header: '답변 상태', field: 'replyStatus' },
    { header: '등록일시', field: 'createdAt' },
    { header: '처리일시', field: 'replyAt' },
  ];
  public supportRowData:any[] = [];
  public tempItems:any[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '고객지원', routerLink: ['/admin/support-manager'] },
    ]);
  }

  ngOnInit() {
  }
}
