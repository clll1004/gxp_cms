/**
 * Created by GRE511 on 2018-09-03.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'by-contents',
  templateUrl: './by-contents.component.html',
  styleUrls: ['../../play-statistics.component.css']})

export class ByContentsComponent implements OnInit, OnChanges {
  @Input() pathName;
  @Input() selectDuration;
  @Input() selectFolder;

  public chartType: string = 'bar';
  public chartLabels: any[] = [];
  public chartData: any[] = [];
  public chartOptions: any;
  public dateArray: any[] = [];
  /*table cols*/
  public contentsStatisticsCols:any[] = [
    { header: '순위', field: 'ranking' },
    { header: '카테고리', field: 'category' },
    { header: '콘텐츠 명', field: 'contentsName' },
    { header: '재생수', field: 'playCount' },
    { header: '재생율', field: 'playRate' },
    { header: '등록일', field: 'updateDate' },
  ];
  /*table data*/
  public tableLists:any[] = [];
  public dateStatisticsData: any[] = [];
  public contentsStatisticsLists:any[] = [];
  public totalData:object = {
    totalPlayCount: 0,
    averagePlayRate: 0,
  };

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    const startDate = new Date(this.selectDuration.date[0]);
    const endDate = new Date(this.selectDuration.date[1]);
    this.dateArray = this.getDateArray(startDate, endDate);
    this.setTableData();
    this.setChartType();
    this.setChartData();
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
    this.contentsStatisticsLists.forEach((item) => {
      this.chartLabels.push(item.contentsName);
      this.chartData.push(item.playCount);
    });
  }

  setTableData() {
    this.tableLists = [];
    this.dateArray.forEach((item) => {
      this.tableLists.push({ date: item.getFullYear() + '-' + (item.getMonth() + 1) + '-' + item.getDate(), empty: '0' });
    });
    this.dateStatisticsData = [];
    this.dateArray.forEach(() => {
      this.contentsStatisticsLists = [];
      this.contentsStatisticsLists.push(
        {
          ranking: 1,
          category: '교육',
          contentsName: '토익 1회',
          playCount: Math.floor(Math.random() * 10000),
          playRate: Math.floor(Math.random() * 100),
          updateDate: '2018-09-09',
        });
      this.contentsStatisticsLists.push(
        {
          ranking: 2,
          category: '사회',
          contentsName: '뮤직뱅크 1회',
          playCount: Math.floor(Math.random() * 10000),
          playRate: Math.floor(Math.random() * 100),
          updateDate: '2018-09-09',
        });
    });
    this.setTotalData();
  }

  setTotalData() {
    const length = this.contentsStatisticsLists.length;
    this.totalData = {
      totalPlayCount: 0,
      averagePlayRate: 0,
    };
    this.contentsStatisticsLists.forEach((item) => {
      this.totalData['totalPlayCount'] += item['playCount'];
      this.totalData['averagePlayRate'] += item['playRate'];
    });
    this.totalData['averagePlayRate'] = Math.floor(this.totalData['averagePlayRate'] / length);
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
      this.chartType = 'bar';
    } else {
      e.currentTarget.setAttribute('class', 'changeType on');
      this.chartType = 'pie';
    }
  }
}
