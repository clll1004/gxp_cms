/**
 * Created by GRE511 on 2018-09-03.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'by-play-section',
  templateUrl: './by-play-section.component.html',
  styleUrls: ['../../play-statistics.component.css']})

export class ByPlaySectionComponent implements OnInit, OnChanges {
  @Input() pathName;
  @Input() selectDuration;
  @Input() selectFolder;

  public chartType:string = 'line';
  public chartLabels:any[] = [];
  public chartData:any[] = [];
  public chartOptions: any;
  public dateArray:any[] = [];
  public tableLists:any[] = [];
  public tempCompareItems:any[] = [];
  public compareItems:any[] = [];
  public isShowMessage:boolean = false;
  public comparePopularSectionValue:any[] = [];
  public compareLeaveSectionValue:any[] = [];
  /*table cols*/
  public playTimeStatisticsCols:any[] = [
    { header: 'No', field: 'no' },
    { header: '그룹명', field: 'groupName' },
    { header: '폴더명', field: 'folderName' },
    { header: '콘텐츠명', field: 'contentsName' },
    { header: '영상 시간', field: 'videoTime' },
    { header: '재생시간', field: 'playTime' },
    { header: '재생수', field: 'playCount' },
    { header: '재생율', field: 'playRate' },
    { header: '평균재생시간', field: 'averagePlayTime' },
    { header: '등록일', field: 'updateDate' },
  ];
  public compareSectionCols:any[] = [
    { header: '일자', field: 'date' },
    { header: '영상 제목', field: 'contentsName' },
    { header: '10%', field: 'p10' },
    { header: '20%', field: 'p20' },
    { header: '30%', field: 'p30' },
    { header: '40%', field: 'p40' },
    { header: '50%', field: 'p50' },
    { header: '60%', field: 'p60' },
    { header: '70%', field: 'p70' },
    { header: '80%', field: 'p80' },
    { header: '90%', field: 'p90' },
    { header: '100%', field: 'p100' },
  ];
  /*table data*/
  public playTimeStatisticsData:any[] = [];
  public compareSectionDatas:any[] = [];
  public showPlaySectionAnalysisContainer:boolean = false;
  /*chart data*/
  public compareLength:any[] = [];
  public comparePlaySectionData:any[] = [];

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    this.setChartType();
    this.setChartData();
    this.setTableData();
    this.showPlaySectionAnalysisContainer = false;
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
    this.playTimeStatisticsData = [];
    let i = 0;
    this.dateArray.forEach(() => {
      i += 1;
      this.playTimeStatisticsData.push(
        { no: i,
          groupName: 'GXP',
          folderName: '사회',
          contentsName: '공인중개사 6강',
          videoTime: 150,
          playTime: '08:13:23',
          playCount: 30,
          playRate: '10%',
          averagePlayTime: '03:20:13',
          updateDate: '2018-09-09',
        });
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

  updateSelectItem(e) {
    this.tempCompareItems = [];
    this.showPlaySectionAnalysisContainer = false;
    e.forEach((item) => {
      this.tempCompareItems.push(item);
    });
  }

  compareSelectItem() {
    if (this.tempCompareItems.length === 0) {
      this.isShowMessage = true;
      return 0;
    }
    this.compareSectionDatas = [];
    this.showPlaySectionAnalysisContainer = true;
    let i = 0;
    this.tempCompareItems.forEach((item) => {
      this.compareSectionDatas.push({
        contentsName: item.contentsName,
        date: this.selectDuration.date[0] + '\n ~ \n' + this.selectDuration.date[1],
        p10: Math.floor(Math.random() * 1000),
        p20: Math.floor(Math.random() * 1000),
        p30: Math.floor(Math.random() * 1000),
        p40: Math.floor(Math.random() * 1000),
        p50: Math.floor(Math.random() * 1000),
        p60: Math.floor(Math.random() * 1000),
        p70: Math.floor(Math.random() * 1000),
        p80: Math.floor(Math.random() * 1000),
        p90: Math.floor(Math.random() * 1000),
        p100: Math.floor(Math.random() * 1000),
        index: i,
      });
      i += 1;
    });
    this.getPopularOrLeaveSection();
    this.setCompareSectionChartData();
  }

  getPopularOrLeaveSection() {
    this.comparePopularSectionValue = [];
    this.compareLeaveSectionValue = [];
    const temp:any[] = [];
    this.compareSectionDatas.forEach((item) => {
      temp.push([item['p10'], item['p20'], item['p30'], item['p40'], item['p50'], item['p60'], item['p70'], item['p80'], item['p90'], item['p100']]);
    });
    temp.forEach((item) => {
      let popular:number = item[0];
      let leave:number = item[0];
      item.forEach((data) => {
        popular = popular < data ? data : popular;
        leave = leave > data ? data : leave;
      });
      this.comparePopularSectionValue.push(popular);
      this.compareLeaveSectionValue.push(leave);
    });
  }

  setCompareSectionChartData() {
    this.comparePlaySectionData = [];
    this.compareLength = [];
    const tempData:any[] = [];
    const tborderColors:any[] = ['#ffcdd2', '#e1bee7'];
    const tbackgroundColors:any[] = ['rgba(255,205,210,.2)', 'rgba(225,190,231,.2)'];
    this.compareSectionDatas.forEach((item) => {
      tempData.push([item['p10'], item['p20'], item['p30'], item['p40'], item['p50'], item['p60'], item['p70'], item['p80'], item['p90'], item['p100']]);
    });
    let i = 0;
    this.compareSectionDatas.forEach((item) => {
      this.compareLength.push(i);
      this.comparePlaySectionData.push({
        labels: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
        datasets: [{
          label: item['contentsName'],
          data: tempData[i],
          fill: true,
          borderColor: tborderColors[i],
          backgroundColor: tbackgroundColors[i],
        }],
      });
      i += 1;
    });
    this.chartOptions = {
      legend: {
        position: 'bottom',
      },
      elements: {
        line: {
          tension: 0,
        },
      },
    };
  }

  compareUnSelectItem() {
    this.compareItems = [];
    this.showPlaySectionAnalysisContainer = false;
  }
}
