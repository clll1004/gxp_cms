/**
 * Created by GRE511 on 2018-08-24.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'show-statistics',
  templateUrl: './show-statistics.component.html',
  styleUrls: ['./show-statistics.component.css']})

export class ShowStatisticsComponent implements OnInit, OnChanges {
  @Input() pathName;
  @Input() selectDuration;
  @Input() selectFolder;
  public chartType:string = 'line';
  public chartLabels:any[] = [];
  public chartData:any[] = [];
  public dateArray:any[] = [];

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    this.setChartType();
    this.setChartData();
  }

  setChartType() {
    const temp = document.getElementsByClassName('changeType');
    for (let i = 0 ; i < temp.length ; i += 1) {
      if (i === 0) {
        temp[i].setAttribute('class', 'changeType on');
      } else {
        temp[i].setAttribute('class', 'changeType');
      }
    }
  }

  setChartData() {
    this.setDefaultChartType();
    this.chartLabels = [];
    this.chartData = [];
    const startDate = new Date(this.selectDuration.date[0]);
    const endDate = new Date(this.selectDuration.date[1]);
    // const dateInterval = Math.floor((endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24);
    this.dateArray = this.getDateArray(startDate, endDate);
    this.dateArray.forEach((item) => {
      const random = Math.floor(Math.random() * 10000);
      this.chartLabels.push((item.getMonth() + 1) + '/' + item.getDate());
      this.chartData.push(random);
    });
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

  setDefaultChartType() {
    switch (this.pathName) {
      case '날짜별':
      case '시간별':
      case '재생구간':
      case '재생시간':
        this.chartType = 'line';
        break;
      case '콘텐츠 통계':
      case '카테고리 통계':
        this.chartType = 'bar';
        break;
      default:
        break;
    }
  }

  changeChartType(e) {
    const temp = e.currentTarget.parentNode.children;
    for (let i = 0 ; i < temp.length ; i += 1) {
      temp[i].setAttribute('class', 'changeType');
    }

    if (e.currentTarget.getAttribute('id') === 'line-type') {
      e.currentTarget.setAttribute('class', 'changeType on');
      this.setDefaultChartType();
    } else {
      e.currentTarget.setAttribute('class', 'changeType on');
      this.chartType = 'pie';
    }
  }
}
