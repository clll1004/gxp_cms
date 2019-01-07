/**
 * Created by GRE511 on 2019-01-07.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';

@Component({
  selector: 'byGXP',
  templateUrl: './byGXP.component.html'})

export class ByGXPComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '통계', routerLink: ['/statistics/play-statistics/byDate'] },
      { label: '사용량 분석', routerLink: ['/statistics/usageAnalysis/byGXP'] },
      { label: 'GXP 사용량', routerLink: ['/statistics/usageAnalysis/byGXP'] },
    ]);
  }

  ngOnInit() {
  }
}
