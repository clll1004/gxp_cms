/**
 * Created by GRE511 on 2018-09-07.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'by-traffic',
  templateUrl: './by-traffic.component.html',
  styleUrls: ['../../usage-analysis.component.css']})

export class ByTrafficComponent implements OnInit, OnChanges {
  @Input() selectDuration;
  public chartLabels: any[] = [];
  public chartData: any[] = [];
  public chartDataSet: object;
  public chartOptions: any;
  public dateArray:any[] = [];
  public backgroundColors:any[] = ['#ffcdd2', '#e1bee7', '#c5cae9', '#bbdefb', '#b2ebf2', '#b2dfdb', '#c8e6c9', '#f8bbd0'];

  /*table cols*/
  public trafficAnalysisCols: any[] = [
    { header: '날짜', field: 'date' },
    { header: '트래픽', field: 'traffic' },
  ];
  /*table data*/
  public trafficAnalysisLists: any[] = [];
  public totalData:object = {
    totalTraffic: 0,
  };

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.setChartData();
    this.setTableData();
  }

  setChartData() {
    this.chartLabels = [];
    this.chartData = [];
    const startDate = new Date(this.selectDuration.date[0]);
    const endDate = new Date(this.selectDuration.date[1]);

    this.dateArray = this.getDateArray(startDate, endDate);
    this.dateArray.forEach((item) => {
      const random = Math.floor(Math.random() * 10000);
      this.chartLabels.push((item.getMonth() + 1) + '/' + item.getDate());
      this.chartData.push(random);
    });

    const tempBackground:any = this.setBackgroundColor();
    this.chartDataSet = {
      labels: this.chartLabels,
      datasets: [
        {
          label: '트래픽',
          data: this.chartData,
          backgroundColor: tempBackground,
        }],
    };
    this.chartOptions = {
      legend: {
        display: false,
      },
    };
  }

  setBackgroundColor() {
    const backgroundLength = this.backgroundColors.length;
    const chartLength = this.chartLabels.length;
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
    this.trafficAnalysisLists = [];
    let i = 0;
    this.dateArray.forEach((item) => {
      this.trafficAnalysisLists.push(
        {
          date: item.getFullYear() + '-' + ((item.getMonth() + 1) < 10 ? '0' + (item.getMonth() + 1) : (item.getMonth() + 1)) + '-' + (item.getDate() < 10 ? '0' + item.getDate() : item.getDate()),
          traffic: this.chartData[i],
        },
      );
      i += 1;
    });
    this.setTotalData();
  }

  setTotalData() {
    this.totalData = {
      totalTraffic: 0,
    };
    this.trafficAnalysisLists.forEach((item) => {
      this.totalData['totalTraffic'] += item['traffic'];
    });
  }
}
