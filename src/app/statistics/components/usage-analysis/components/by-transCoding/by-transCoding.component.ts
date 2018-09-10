/**
 * Created by GRE511 on 2018-09-10.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'by-transCoding',
  templateUrl: './by-transCoding.component.html',
  styleUrls: ['../../usage-analysis.component.css']})

export class ByTransCodingComponent implements OnInit, OnChanges {
  @Input() selectDuration;
  public chartLabels: any[] = [];
  public chartData: any[] = [];
  public chartDataSet: object;
  public chartOptions: any;
  public dateArray:any[] = [];
  public backgroundColors:any[] = ['#ffcdd2', '#e1bee7', '#c5cae9', '#bbdefb', '#b2ebf2', '#b2dfdb', '#c8e6c9', '#f8bbd0'];

  /*table cols*/
  public transCodingAnalysisCols: any[] = [
    { header: '날짜', field: 'date' },
    { header: '트랜스코딩', field: 'transCoding' },
    { header: '콘텐츠 등록 수', field: 'contentsCount' },
  ];
  /*table data*/
  public transCodingAnalysisLists: any[] = [];
  public totalData:object = {
    totalTransCoding: 0,
    tableTotalContentsCount: 0,
    totalContentsCount: 0,
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
    const transCodingTemp:any[] = [];
    const contentsCountTemp:any[] = [];
    this.dateArray.forEach((item) => {
      const transCodingRandom = Math.floor(Math.random() * 10000);
      const contentsCountRandom = Math.floor(Math.random() * 10000);
      this.chartLabels.push((item.getMonth() + 1) + '/' + item.getDate());
      transCodingTemp.push(transCodingRandom);
      contentsCountTemp.push(contentsCountRandom);
    });
    this.chartData.push(transCodingTemp);
    this.chartData.push(contentsCountTemp);

    const tempBackground:any = this.setBackgroundColor();
    this.chartDataSet = {
      labels: this.chartLabels,
      datasets: [
        {
          label: '트랜스코딩',
          data: this.chartData[0],
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
    this.transCodingAnalysisLists = [];
    let i = 0;
    this.dateArray.forEach((item) => {
      this.transCodingAnalysisLists.push(
        {
          date: item.getFullYear() + '-' + ((item.getMonth() + 1) < 10 ? '0' + (item.getMonth() + 1) : (item.getMonth() + 1)) + '-' + (item.getDate() < 10 ? '0' + item.getDate() : item.getDate()),
          transCoding: this.chartData[0][i],
          contentsCount: this.chartData[1][i],
        },
      );
      i += 1;
    });
    this.transCodingAnalysisLists.reverse();
    this.setTotalData();
  }

  setTotalData() {
    this.totalData = {
      totalTransCoding: 0,
      tableTotalContentsCount: 0,
      totalContentsCount: 0,
    };
    this.transCodingAnalysisLists.forEach((item) => {
      this.totalData['totalTransCoding'] += item['transCoding'];
      this.totalData['tableTotalContentsCount'] += item['contentsCount'];
    });
  }
}
