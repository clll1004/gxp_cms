/**
 * Created by GRE511 on 2019-01-07.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';

@Component({
  selector: 'exportReport',
  styleUrls: ['../../../statistics.component.css'],
  templateUrl: './exportReport.component.html'})

export class ExportReportComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '통계', routerLink: ['/statistics/play-statistics/byDate'] },
      { label: '리포트', routerLink: ['/statistics/reporter/exportReport'] },
      { label: '리포트 발송', routerLink: ['/statistics/reporter/exportReport'] },
    ]);
  }

  ngOnInit() {

  }
}
