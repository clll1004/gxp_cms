/**
 * Created by GRE511 on 2018-09-07.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'by-usage-storage',
  templateUrl: './by-usage-storage.component.html',
  styleUrls: ['../../usage-analysis.component.css']})

export class ByUsageStorageComponent implements OnInit, OnChanges {
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
  public backgroundColors:any[] = ['#ffcdd2', '#e1bee7'];

  /*table cols*/
  public storageAnalysisCols: any[] = [
    { header: '날짜', field: 'date' },
    { header: '원본 파일', field: 'originStorage' },
    { header: '트랜스코딩 파일', field: 'transCodingStorage' },
    { header: '총합', field: 'fileTotalStorage' },
  ];
  /*table data*/
  public storageAnalysisLists: any[] = [];
  public totalData:object = {
    totalOriginStorage: 0,
    totalTransCodingStorage: 0,
    totalStorage: 0,
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
    const originTemp:any[] = [];
    const transTemp:any[] = [];
    const totalTemp:any[] =[];
    this.dateArray.forEach((item) => {
      const originRandom = Math.floor(Math.random() * 100);
      const transRandom = Math.floor(Math.random() * 100);
      const total = originRandom + transRandom;
      this.barChartLabels.push((item.getMonth() + 1) + '/' + item.getDate());
      originTemp.push(originRandom);
      transTemp.push(transRandom);
      totalTemp.push(total);
    });
    this.barChartData.push(originTemp);
    this.barChartData.push(transTemp);
    this.barChartData.push(totalTemp);

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
          label: '원본파일',
          data: this.barChartData[0],
          backgroundColor: this.backgroundColors[0],
        },
        {
          label: '트랜스코딩 파일',
          data: this.barChartData[1],
          backgroundColor: this.backgroundColors[1],
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
        }],
      },
    };
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
    this.storageAnalysisLists = [];
    let i = 0;
    this.dateArray.forEach((item) => {
      this.storageAnalysisLists.push(
        {
          date: item.getFullYear() + '-' + ((item.getMonth() + 1) < 10 ? '0' + (item.getMonth() + 1) : (item.getMonth() + 1)) + '-' + (item.getDate() < 10 ? '0' + item.getDate() : item.getDate()),
          originStorage: this.barChartData[0][i],
          transCodingStorage: this.barChartData[1][i],
          fileTotalStorage: this.barChartData[2][i],
        },
      );
      i += 1;
    });
    this.storageAnalysisLists.reverse();
    this.setTotalData();
  }

  setTotalData() {
    this.totalData = {
      totalOriginStorage: 0,
      totalTransCodingStorage: 0,
      totalStorage: 0,
    };
    this.storageAnalysisLists.forEach((item) => {
      this.totalData['totalOriginStorage'] += item['originStorage'];
      this.totalData['totalTransCodingStorage'] += item['transCodingStorage'];
      this.totalData['totalStorage'] += item['fileTotalStorage'];
    });
  }
}
