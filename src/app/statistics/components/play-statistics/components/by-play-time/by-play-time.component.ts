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

  public isCompareStatus:boolean = false;

  public chartType:string = 'line';
  public chartLabels:any[] = [];
  public chartData:any[] = [];
  public chartOptions: any;
  public dateArray:any[] = [];
  public tableLists:any[] = [];
  public tempCompareItems:any[] = [];
  public compareItems:any[] = [];
  public isShowMessage:boolean = false;
  public isShowCheckLimitMessage:boolean = false;
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
  public playTimeStatisticsDatas:any[] = [];
  /*chart data*/
  public comparePlayTimeData:any;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    this.setChartType();
    this.setChartData();
    this.setTableData();
    this.tempCompareItems = [this.playTimeStatisticsDatas[0]];
    this.compareItems = this.tempCompareItems;
    this.setCompareChartData();
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
    this.playTimeStatisticsDatas = [];
    let i = 0;
    this.dateArray.forEach(() => {
      i += 1;
      this.playTimeStatisticsDatas.push(
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

  onRowSelect() {
    if (this.tempCompareItems.length > 3) {
      this.isShowCheckLimitMessage = true;
      this.tempCompareItems.pop();
      return 0;
    }
    if (this.tempCompareItems.length === 0 || this.tempCompareItems.length === 1) {
      this.isCompareStatus = false;
      this.compareItems = this.tempCompareItems;
      this.setCompareChartData();
    } else if (this.isCompareStatus && this.tempCompareItems.length === 2) {
      this.compareItems = this.tempCompareItems;
      this.setCompareChartData();
    } else if (this.isCompareStatus && this.tempCompareItems.length === 3) {
      this.compareItems = this.tempCompareItems;
      this.setCompareChartData();
    }
  }

  showCompareResult() {
    if (this.tempCompareItems.length >= 2) {
      this.compareItems = [];
      this.isCompareStatus = true;
      this.compareItems = this.tempCompareItems;
      this.setCompareChartData();
    } else {
      this.isShowMessage = true;
    }
  }

  showSingleResult() {
    this.isCompareStatus = false;
    if (this.tempCompareItems.length === 2 || this.tempCompareItems.length === 3) {
      this.tempCompareItems = [this.tempCompareItems[0]];
    }
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

  deleteCompareItem(target) {
    this.compareItems = [];
    this.tempCompareItems.forEach((item) => {
      if (item.no !== target.no) {
        this.compareItems.push(item);
      }
    });
    if (this.compareItems.length === 1) {
      this.isCompareStatus = false;
    }
    this.tempCompareItems = this.compareItems;
    this.setCompareChartData();
  }
}
