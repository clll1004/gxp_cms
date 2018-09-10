/**
 * Created by GRE511 on 2018-09-10.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'by-gxp',
  templateUrl: './by-gxp.component.html',
  styleUrls: ['../../usage-analysis.component.css']})

export class ByGxpComponent implements OnInit, OnChanges {
  @Input() selectDuration;
  public pieChartLabels: any[] = ['현재 사용량', '남은 용량'];
  public pieChartData: any[] = [30, 70];
  public pieChartDataSet: object;
  public pieChartOptions: object;
  public barChartLabels: any[] = [];
  public barChartData: any[] = [];
  public barChartDataSet: object;
  public barChartOptions: object;

  public dateArray:any[] = [];
  public backgroundColors:any[] = ['#ffcdd2', '#e1bee7', '#c5cae9', '#bbdefb', '#b2ebf2', '#b2dfdb', '#c8e6c9', '#f8bbd0'];

  /*table cols*/
  public gxpAnalysisCols: any[] = [
    { header: '날짜', field: 'date' },
    { header: '스토리지', field: 'storage' },
    { header: '전송량', field: 'transmissionCapacity' },
  ];
  /*table data*/
  public gxpAnalysisLists: any[] = [];
  public totalData:object = {
    totalStorage: 0,
    totalTransmissionCapacity: 0,
  };

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.setChartData();
    this.setTableData();
  }

  setChartData() {
    this.barChartLabels = [];
    this.barChartData = [];
    const startDate = new Date(this.selectDuration.date[0]);
    const endDate = new Date(this.selectDuration.date[1]);
    this.dateArray = this.getDateArray(startDate, endDate);
    const storageTemp:any[] = [];
    const transmissionCapacityTemp:any[] = [];
    this.dateArray.forEach((item) => {
      const storageRandom = Math.floor(Math.random() * 100);
      const transmissionCapacityRandom = Math.floor(Math.random() * 100);
      this.barChartLabels.push((item.getMonth() + 1) + '/' + item.getDate());
      storageTemp.push(storageRandom);
      transmissionCapacityTemp.push(transmissionCapacityRandom);
    });
    this.barChartData.push(storageTemp);
    this.barChartData.push(transmissionCapacityTemp);

    const tempBackground:any = this.setBackgroundColor();
    this.pieChartDataSet = {
      labels: this.pieChartLabels,
      datasets: [
        {
          label: '스토리지',
          data: this.pieChartData,
          backgroundColor: this.backgroundColors,
        }],
    };
    this.pieChartOptions = {
      legend: {
        position: 'bottom',
      },
    };
    this.barChartDataSet = {
      labels: this.barChartLabels,
      datasets: [
        {
          label: '스토리지',
          data: this.barChartData[0],
          backgroundColor: tempBackground,
        },
      ],
    };
    this.barChartOptions = {
      legend: {
        display: false,
      },
    };
  }

  setBackgroundColor() {
    const backgroundLength = this.backgroundColors.length;
    const chartLength = this.barChartLabels.length;
    const tempBackground:any[] = [];

    let i = 0;
    let count = 0;
    do {
      tempBackground.push(this.backgroundColors[i]);
      i += 1;
      if (i > backgroundLength) {
        i = 0;
      }
      count += 1;
    } while (count < chartLength);

    return tempBackground;
  }

  getDateArray(startDate, endDate) {
    const dateArray:any[] = [];
    const currentDate = startDate;
    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }

  setTableData() {
    this.gxpAnalysisLists = [];
    let i = 0;
    this.dateArray.forEach((item) => {
      this.gxpAnalysisLists.push(
        {
          date: item.getFullYear() + '-' + ((item.getMonth() + 1) < 10 ? '0' + (item.getMonth() + 1) : (item.getMonth() + 1)) + '-' + (item.getDate() < 10 ? '0' + item.getDate() : item.getDate()),
          storage: this.barChartData[0][i],
          transmissionCapacity: this.barChartData[1][i],
        },
      );
      i += 1;
    });
    this.gxpAnalysisLists.reverse();
    this.setTotalData();
  }

  setTotalData() {
    this.totalData = {
      totalStorage: 0,
      totalTransmissionCapacity: 0,
    };
    this.gxpAnalysisLists.forEach((item) => {
      this.totalData['totalStorage'] += item['storage'];
      this.totalData['totalTransmissionCapacity'] += item['transmissionCapacity'];
    });
  }
}
