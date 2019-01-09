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
  public transMonitoringCols:any[] = [
    { header: '미디어보관함', field: 'mediaStorage' },
    { header: '파일명', field: 'fileName' },
    { header: '파일경로', field: 'filePath' },
    { header: '변환상태', field: 'transitionStatus' },
    { header: '진행률', field: 'progress' },
    { header: '원본 파일 크기', field: 'fileOriSize' },
    { header: '변환 파일 크기', field: 'fileSize' },
    { header: '변환시작일', field: 'startDate' },
    { header: '최종 작업시간', field: 'totalTransTime' },
  ];
  public transMonitoringRowData:any[] = [
    { mediaStorage: '초등교육', fileName: 'adf.mp4', filePath: '/path/2018', transitionStatus: '완료', progress: '55', fileOriSize: '150', fileSize: '30', startDate: '2018-05-30 05:30:22', totalTransTime: '2018-05-30 05:30:20' },
    { mediaStorage: '중등교육', fileName: 'adf.mp4', filePath: '/path/2018', transitionStatus: '완료', progress: '55', fileOriSize: '150', fileSize: '30', startDate: '2018-05-30 05:30:22', totalTransTime: '2018-05-30 05:30:20' },
    { mediaStorage: '고등교육', fileName: 'adf.mp4', filePath: '/path/2018', transitionStatus: '완료', progress: '55', fileOriSize: '150', fileSize: '30', startDate: '2018-05-30 05:30:22', totalTransTime: '2018-05-30 05:30:20' },
  ];
  public tempCompareItems:any[] = [];

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

