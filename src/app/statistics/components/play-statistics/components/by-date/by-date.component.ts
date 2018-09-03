/**
 * Created by GRE511 on 2018-09-03.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'by-date',
  templateUrl: './by-date.component.html',
  styleUrls: ['../../play-statistics.component.css']})

export class ByDateComponent implements OnInit, OnChanges {
  @Input() pathName;
  @Input() selectDuration;
  @Input() selectFolder;

  public chartType: string = 'line';
  public chartLabels: any[] = [];
  public chartData: any[] = [];
  public chartOptions: any;
  public dateArray: any[] = [];
  /*table cols*/
  public dateStatisticsCols: any[] = [
    { header: '날짜', field: 'date' },
    { header: '요청된 콘텐츠 수', field: 'contentsCount' },
    { header: '재생수', field: 'playCount' },
    { header: '재생율', field: 'playRate' },
    { header: '재생시간', field: 'playTime' },
    { header: '평균 재생시간', field: 'averagePlayTime' },
    { header: '전일 대비 재생 수 증감', field: 'variation' },
  ];
  /*table data*/
  public tableLists:any[] = [];
  public dateStatisticsData: any[] = [];

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    this.setChartType();
    this.setChartData();
    this.setTableData();
  }

  setChartType() {
    const temp = document.getElementsByClassName('changeType');
    for (let i = 0; i < temp.length; i += 1) {
      if (i === 0) {
        temp[i].setAttribute('class', 'changeType on');
      } else {
        temp[i].setAttribute('class', 'changeType');
      }
    }
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
  }

  setTableData() {
    this.tableLists = [];
    this.dateArray.forEach((item) => {
      this.tableLists.push({ date: item.getFullYear() + '-' + (item.getMonth() + 1) + '-' + item.getDate(), empty: '0' });
    });
    this.dateStatisticsData = [];
    this.dateArray.forEach((item) => {
      this.dateStatisticsData.push(
        {
          date: item.getFullYear() + '-' + (item.getMonth() + 1) + '-' + item.getDate(),
          contentsCount: 30,
          playCount: 20,
          playRate: '10%',
          playTime: 150,
          averagePlayTime: 20,
          variation: '+ 10',
        },
      );
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

  changeChartType(e) {
    const temp = e.currentTarget.parentNode.children;
    for (let i = 0 ; i < temp.length ; i += 1) {
      temp[i].setAttribute('class', 'changeType');
    }

    if (e.currentTarget.getAttribute('id') === 'line-type') {
      e.currentTarget.setAttribute('class', 'changeType on');
      this.chartType = 'line';
    } else {
      e.currentTarget.setAttribute('class', 'changeType on');
      this.chartType = 'pie';
    }
  }
}
