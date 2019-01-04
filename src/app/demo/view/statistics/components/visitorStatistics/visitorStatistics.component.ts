/**
 * Created by GRE511 on 2019-01-03.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../breadcrumb.service';

@Component({
  selector: 'visitorStatistics',
  styleUrls: ['./visitorStatistics.component.css'],
  templateUrl: './visitorStatistics.component.html'})

export class VisitorStatisticsComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '통계', routerLink: ['/statistics/play-statistics/byDate'] },
      { label: '방문자 통계', routerLink: ['/statistics/visitor-statistics'] },
    ]);
  }

  ngOnInit() {
  }
}