/**
 * Created by GRE511 on 2019-01-03.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'byAd',
  styleUrls: ['../../../statistics.component.css'],
  templateUrl: './byAd.component.html'})

export class ByAdComponent implements OnInit {
  public rangeDates:Date[] = [new Date(), new Date()];

  public barChartDataSet: object;
  public barChartOptions: object;
  public barChartLabels = ['09/01', '09/02', '09/03', '09/04', '09/05', '09/06', '09/07'];

  public typeOption:any = [{ label: '전체', value: 'all' }, { label: '광고전송', value: 'transmitAd' }, { label: '스킨변경', value: 'changeSkin' }];
  public selectedType: any = 'all';

  public adCols:any[] = [
    { header: '타입', field: 'type' },
    { header: '광고명', field: 'adName' },
    { header: '전송수', field: 'transmitCount' },
    { header: '열람', field: 'reading' },
    { header: '미열람', field: 'notReading' },
    { header: '실패', field: 'fail' },
    { header: '전송일시', field: 'transmitDate' },
  ];
  public adRowData:any[] = [
    { type: '스킨변경', adName: '후기작성알림', transmitCount: '5', reading: '5', notReading: '5', fail: '5', transmitDate: '2018-05-30 05:30:22' },
  ];
  constructor() {}

  ngOnInit() {
    this.barChartDataSet = {
      labels: this.barChartLabels,
      datasets: [
        {
          label: '열람',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: 'rgba(248,121,16,.6)',
        },
        {
          label: '미열람',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: 'rgba(248,121,16,.3)',
        },
        {
          label: '실패',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: 'rgba(248,121,16,.1)',
        }
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
  }
}
