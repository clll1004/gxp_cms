/**
 * Created by GRE511 on 2019-01-07.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';

@Component({
  selector: 'autoReport',
  styleUrls: ['../../../statistics.component.css'],
  templateUrl: './autoReport.component.html'})

export class AutoReportComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '통계', routerLink: ['/statistics/play-statistics/byDate'] },
      { label: '리포트', routerLink: ['/statistics/reporter/exportReport'] },
      { label: '자동리포트 설정', routerLink: ['/statistics/reporter/autoReport'] },
    ]);
  }

  ngOnInit() {

  }
}
