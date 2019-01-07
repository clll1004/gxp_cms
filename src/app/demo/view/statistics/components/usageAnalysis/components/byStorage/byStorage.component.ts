/**
 * Created by GRE511 on 2019-01-07.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';

@Component({
  selector: 'byStorage',
  styleUrls: ['../../../statistics.component.css'],
  templateUrl: './byStorage.component.html'})

export class ByStorageComponent implements OnInit {
  public rangeDates:Date[] = [new Date(), new Date()];

  public barData:any;
  public pieData:any;

  public storageCols:any[] = [
    { header: '날짜', field: 'date' },
    { header: '원본 파일', field: 'fileOriSize' },
    { header: '인코딩 파일', field: 'fileSize' },
    { header: '총합', field: 'totalSize' },
  ];
  public storageRowData:any[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '통계', routerLink: ['/statistics/play-statistics/byDate'] },
      { label: '사용량 분석', routerLink: ['/statistics/usageAnalysis/byGXP'] },
      { label: '스토리지 사용량', routerLink: ['/statistics/usageAnalysis/byStorage'] },
    ]);
  }

  ngOnInit() {
    this.barData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(248,121,16,.6)',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
      ],
    };

    this.pieData = {
      labels: ['A', 'B'],
      datasets: [
        {
          data: [90, 10],
          backgroundColor: [
            '#f87910',
            '#ddd',
          ]
        }]
    };
  }
}
