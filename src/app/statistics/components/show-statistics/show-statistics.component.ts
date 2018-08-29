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
  public chartOptions: any;
  public dateArray:any[] = [];
  public tableLists:any[] = [];
  public tempCompareItems:any[] = [];
  public compareItems:any[] = [];
  public isShowMessage:boolean = false;
  /*table cols*/
  public dateStatisticsCols:any[] = [
    { header: '날짜', field: 'date' },
    { header: '요청된 콘텐츠 수', field: 'contentsCount' },
    { header: '재생수', field: 'playCount' },
    { header: '재생율', field: 'playRate' },
    { header: '재생시간', field: 'playTime' },
    { header: '평균 재생시간', field: 'averagePlayTime' },
    { header: '전일 대비 재생 수 증감', field: 'variation' },
  ];
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
  public contentsStatisticsCols:any[] = [
    { header: '순위', field: 'ranking' },
    { header: '카테고리', field: 'category' },
    { header: '콘텐츠 명', field: 'contentsName' },
    { header: '재생수', field: 'playCount' },
    { header: '재생율', field: 'playRate' },
    { header: '등록일', field: 'updateDate' },
  ];
  public categoryStatisticsCols:any[] = [
    { header: '순위', field: 'ranking' },
    { header: '카테고리', field: 'category' },
    { header: '콘텐츠 명', field: 'contentsName' },
    { header: '재생수', field: 'playCount' },
    { header: '재생율', field: 'playRate' },
  ];
  /*table data*/
  public dateStatisticsData:any[] = [];
  public playTimeStatisticsData:any[] = [];
  public contentsStatisticsData:any[] = [];
  public categoryStatisticsData:any[] = [];
  public showAnalysisContainer:boolean = false;
  /*chart data*/
  public comparePlayTimeData:any;

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    this.setChartType();
    this.setChartData();
    this.setTableData();
    this.showAnalysisContainer = false;
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

  setTableData() {
    this.tableLists = [];
    this.dateArray.forEach((item) => {
      this.tableLists.push({ date: item.getFullYear() + '-' + (item.getMonth() + 1) + '-' + item.getDate(), empty: '0' });
    });
    if (this.pathName === '날짜별') {
      this.dateStatisticsData = [];
      this.dateArray.forEach((item) => {
        this.dateStatisticsData.push(
          { date: item.getFullYear() + '-' + (item.getMonth() + 1) + '-' + item.getDate(),
            contentsCount: 30,
            playCount: 20,
            playRate: '10%',
            playTime: 150,
            averagePlayTime: 20,
            variation: '+ 10',
          });
      });
    } else if (this.pathName === '재생 시간') {
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
    } else if (this.pathName === '콘텐츠 통계') {
      this.contentsStatisticsData = [];
      this.contentsStatisticsData.push(
        {
          ranking: 1,
          category: '교육',
          contentsName: '토익 1회',
          playCount: 30,
          playRate: '10%',
          updateDate: '2018-09-09',
        });
    } else if (this.pathName === '카테고리 통계') {
      this.categoryStatisticsData = [];
      this.categoryStatisticsData.push(
        {
          ranking: 1,
          category: '교육',
          contentsName: '토익 1회',
          playCount: 30,
          playRate: '10%',
        });
    }
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

  updateSelectItem(e) {
    this.tempCompareItems = [];
    this.showAnalysisContainer = false;
    e.forEach((item) => {
      this.tempCompareItems.push(item);
    });
  }

  compareSelectItem() {
    this.compareItems = [];
    if (this.tempCompareItems.length === 0) {
      this.isShowMessage = true;
      return 0;
    }
    this.compareItems = this.tempCompareItems;
    this.showAnalysisContainer = true;
    this.compareChartDataSet();
  }

  compareChartDataSet() {
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
    this.showAnalysisContainer = false;
  }

  deleteCompareItem(target) {
    this.compareItems = [];
    this.tempCompareItems.forEach((item) => {
      if (item.no !== target.no) {
        this.compareItems.push(item);
      }
    });
    this.tempCompareItems = this.compareItems;
    this.compareChartDataSet();
  }
}
