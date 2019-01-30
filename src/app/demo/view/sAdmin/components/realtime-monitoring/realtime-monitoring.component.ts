/**
 * Created by GRE511 on 2019-01-30.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../breadcrumb.service';

@Component({
  selector: 'realtime-monitoring',
  styleUrls: ['../sAdmin.component.css'],
  templateUrl: './realtime-monitoring.component.html'})

export class RealTimeMonitoringComponent implements OnInit {
  public tabIndex:number = 0;
  public transMonitoringCols:any[] = [
    { header: '트랜스코딩 서버 IP', field: 'ip' },
    { header: '서버용도', field: 'purpose' },
    { header: '사용여부', field: 'usage' },
    { header: '등록일시', field: 'regDate' },
    { header: '수정일시', field: 'upDateAt' },
  ];
  public transMonitoringRowData:any[] = [];
  public tempItems:any[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '모니터링', routerLink: ['/admin/realtime-monitoring'] },
      { label: '실시간 서버 모니터링', routerLink: ['/admin/realtime-monitoring'] },
    ]);
  }

  ngOnInit() {
  }

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
    this.loadTransList();
  }

  loadTransList() {

  }
}
