/**
 * Created by GRE511 on 2019-01-30.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../breadcrumb.service';

@Component({
  selector: 'encoding-monitoring',
  styleUrls: ['../sAdmin.component.css'],
  templateUrl: './encoding-monitoring.component.html'})

export class EncodingMonitoringComponent implements OnInit {
  public tabIndex:number = 0;
  public transMonitoringCols:any[] = [
    { header: '미디어보관함', field: 'gf_nm', width: '10%' },
    { header: '파일명', field: 'fo_nm', width: '15%' },
    { header: '파일경로', field: 'fo_path', width: '15%' },
    { header: '변환상태', field: 'status', width: '6%' },
    { header: '진행률', field: 'ft_progress', width: '5%' },
    { header: '원본 파일 크기', field: 'fo_size', width: '10%' },
    { header: '변환 파일 크기', field: 'ft_size', width: '10%' },
    { header: '변환시작일', field: 'ft_start_dtm', width: '10%' },
    { header: '최종 작업시간', field: 'ft_end_dtm', width: '10%' },
  ];
  public transMonitoringRowData:any[] = [];
  public tempItems:any[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '모니터링', routerLink: ['/admin/realtime-monitoring'] },
      { label: '인코딩 모니터링', routerLink: ['/admin/encoding-monitoring'] },
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
