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

  public barChartDataSet: object;
  public barChartOptions: object;
  public barChartLabels = ['09/01', '09/02', '09/03', '09/04', '09/05', '09/06', '09/07'];
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
    this.barChartDataSet = {
      labels: this.barChartLabels,
      datasets: [
        {
          label: '원본파일',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: 'rgba(248,121,16,.6)',
        },
        {
          label: '인코딩파일',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: 'rgba(248,121,16,.3)',
        },
      ],
    };
    this.barChartOptions = {
      legend: {
        position: 'bottom',
      },
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero:true,
            userCallback: (label) => {
              if (Math.floor(label) === label) {
                return label;
              }
            },
          },
        }],
      },
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
