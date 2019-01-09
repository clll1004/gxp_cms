/**
 * Created by GRE511 on 2019-01-09.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../breadcrumb.service';

@Component({
  selector: 'trans-monitoring',
  styleUrls: ['./trans-monitoring.component.css'],
  templateUrl: './trans-monitoring.component.html'})

export class TransMonitoringComponent implements OnInit {
  public tabIndex:number = 0;

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '변환 모니터링', routerLink: ['/trans-monitoring'] },
    ]);
  }

  ngOnInit() {}

  selectItem(e) {
    const target = e.currentTarget;
    if (target.getAttribute('class') !== 'on') {
      const tab = document.getElementById('selectTab').children;
      [].forEach.call(tab, (item) => {
        item.setAttribute('class', '');
      });
      target.setAttribute('class', 'on');
    }
    this.tabIndex = target.tabIndex;
  }
}

