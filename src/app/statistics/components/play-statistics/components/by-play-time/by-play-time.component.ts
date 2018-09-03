/**
 * Created by GRE511 on 2018-09-03.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'by-play-time',
  templateUrl: './by-play-time.component.html',
  styleUrls: ['../../play-statistics.component.css']})

export class ByPlayTimeComponent implements OnInit, OnChanges {
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
  public compareHeaderCols:any[] = [
    { header: '폴더명', field: 'folderName' },
    { header: '콘텐츠명', field: 'contentsName' },
    { header: '재생시간', field: 'playTime' },
    { header: '재생수', field: 'playCount' },
    { header: '재생율', field: 'playRate' },
    { header: '평균재생시간', field: 'averagePlayTime' },
  ];
  public compareResultHeaderCols:any[] = [
    { header: '콘텐츠명', field: 'contentsName' },
    { header: '그룹명', field: 'groupName' },
    { header: '폴더명', field: 'folderName' },
    { header: '일자', field: 'date' },
    { header: '재생시간', field: 'playTime' },
    { header: '재생수', field: 'playCount' },
    { header: '재생율', field: 'playRate' },
    { header: '평균재생시간', field: 'averagePlayTime' },
  ];
  /*table data*/
  public playTimeStatisticsData:any[] = [];
  public showPlayTimeAnalysisContainer:boolean = false;
  /*chart data*/
  public comparePlayTimeData:any;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    this.setChartType();
    this.setChartData();
    this.setTableData();
    this.showPlayTimeAnalysisContainer = false;
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
    this.showPlayTimeAnalysisContainer = false;
    e.forEach((item) => {
      this.tempCompareItems.push(item);
    });
  }

  compareSelectItem() {
    if (this.tempCompareItems.length === 0) {
      this.isShowMessage = true;
      return 0;
    }
    this.compareItems = [];
    this.showPlayTimeAnalysisContainer = true;
    this.compareItems = this.tempCompareItems;
    this.setCompareChartData();
  }

  setCompareChartData() {
    const randomItems:any[] = [];
    let randomItem:any[] = [];
    let random = 0;
    this.compareItems.forEach(() => {
      randomItem = [];
      this.dateArray.forEach(() => {
        random = Math.floor(Math.random() * 30);
        randomItem.push(random);
      });
      randomItems.push(randomItem);
    });

    const tempDataSets:any[] = [];
    let i:number = 0;
    const bdc:any[] = ['#ffcdd2', '#e1bee7', '#c5cae9'];
    this.compareItems.forEach((item) => {
      tempDataSets.push(
        {
          label: item['contentsName'],
          data: randomItems[i],
          fill: false,
          borderColor: bdc[i],
        });
      i += 1;
    });
    this.comparePlayTimeData = {
      labels: this.chartLabels,
      datasets: tempDataSets,
    };
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
    this.showPlayTimeAnalysisContainer = false;
  }

  deleteCompareItem(target) {
    this.compareItems = [];
    this.tempCompareItems.forEach((item) => {
      if (item.no !== target.no) {
        this.compareItems.push(item);
      }
    });
    this.tempCompareItems = this.compareItems;
    this.setCompareChartData();
  }
}
