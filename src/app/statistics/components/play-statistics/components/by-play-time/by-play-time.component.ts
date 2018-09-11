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
  public comparePlayTimeChartData:object;
  public comparePlayTimeTableDatas:any[] = [];
  public compareSectionTotalData:any[] = [];
  public compareSectionAverageData:any[] = [];

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    const startDate = new Date(this.selectDuration.date[0]);
    const endDate = new Date(this.selectDuration.date[1]);
    this.dateArray = this.getDateArray(startDate, endDate);
    this.setTableData();
    this.tempCompareItems = [this.playTimeStatisticsDatas[0]];
    this.compareItems = this.tempCompareItems;
    this.setCompareChartData();
    this.setCompareTableData();
  }

  setTableData() {
    this.tableLists = [];
    this.dateArray.forEach((item) => {
      this.tableLists.push({ date: item.getFullYear() + '-' + (item.getMonth() + 1) + '-' + item.getDate(), empty: '0' });
    });
    this.playTimeStatisticsDatas = [];
    this.playTimeStatisticsDatas.push(
      { no: 1,
        groupName: 'GXP',
        folderName: '사회',
        contentsName: '토익1강',
        videoTime: 30,
        playTime: '08:13:23',
        playCount: Math.floor(Math.random() * 10000),
        playRate: 10,
        averagePlayTime: '08:13:23',
        updateDate: '2018-09-09',
      });
    this.playTimeStatisticsDatas.push(
      { no: 2,
        groupName: 'GXP',
        folderName: '사회',
        contentsName: '토익2강',
        videoTime: 30,
        playTime: '08:13:23',
        playCount: Math.floor(Math.random() * 10000),
        playRate: 10,
        averagePlayTime: '08:13:23',
        updateDate: '2018-09-09',
      });
    this.playTimeStatisticsDatas.push(
      { no: 3,
        groupName: 'GXP',
        folderName: '사회',
        contentsName: '토익3강',
        videoTime: 30,
        playTime: '08:13:23',
        playCount: Math.floor(Math.random() * 10000),
        playRate: 10,
        averagePlayTime: '08:13:23',
        updateDate: '2018-09-09',
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
      this.setCompareTableData();
    } else if (this.isCompareStatus && this.tempCompareItems.length === 2) {
      this.compareItems = this.tempCompareItems;
      this.setCompareChartData();
      this.setCompareTableData();
    } else if (this.isCompareStatus && this.tempCompareItems.length === 3) {
      this.compareItems = this.tempCompareItems;
      this.setCompareChartData();
      this.setCompareTableData();
    }
  }

  showCompareResult() {
    if (this.tempCompareItems.length >= 2) {
      this.compareItems = [];
      this.isCompareStatus = true;
      this.compareItems = this.tempCompareItems;
      this.setCompareChartData();
      this.setCompareTableData();
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
    this.setCompareTableData();
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
    this.chartLabels = [];
    this.dateArray.forEach((item) => {
      this.chartLabels.push((item.getMonth() + 1) + '/' + item.getDate());
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
    this.comparePlayTimeChartData = {
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

  setCompareTableData() {
    this.comparePlayTimeTableDatas = [];
    this.compareItems.forEach((item) => {
      this.dateArray.forEach((date) => {
        this.comparePlayTimeTableDatas.push({
          contentsName: item['contentsName'],
          groupName: item['groupName'],
          folderName: item['folderName'],
          dates: date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()),
          playTime: 0,
          playCount: Math.floor((Math.random() * 10000)),
          playRate: Math.floor((Math.random() * 100)),
          averagePlayTime: 0,
        });
      });
    });
    this.setCompareTableAverageData();
  }

  setCompareTableAverageData() {
    const length = this.dateArray.length;
    const first = this.comparePlayTimeTableDatas.slice(0, length);
    const second = this.comparePlayTimeTableDatas.slice(length, length * 2);
    const third = this.comparePlayTimeTableDatas.slice(length * 2, length * 3);
    let tempTotal:object = {
      contentsName: '',
      totalPlayTime: 0,
      totalPlayCount: 0,
      totalPlayRate: 0,
      totalAveragePlayTime: 0,
    };
    this.compareSectionTotalData = [];

    first.forEach((item) => {
      tempTotal['contentsName'] = item['contentsName'];
      tempTotal['totalPlayTime'] += item['playTime'];
      tempTotal['totalPlayCount'] += item['playCount'];
      tempTotal['totalPlayRate'] += item['playRate'];
      tempTotal['totalAveragePlayTime'] += item['averagePlayTime'];
    });
    this.compareSectionTotalData.push(tempTotal);
    tempTotal = {
      contentsName: '',
      totalPlayTime: 0,
      totalPlayCount: 0,
      totalPlayRate: 0,
      totalAveragePlayTime: 0,
    };
    if (second.length) {
      second.forEach((item) => {
        tempTotal['contentsName'] = item['contentsName'];
        tempTotal['totalPlayTime'] += item['playTime'];
        tempTotal['totalPlayCount'] += item['playCount'];
        tempTotal['totalPlayRate'] += item['playRate'];
        tempTotal['totalAveragePlayTime'] += item['averagePlayTime'];
      });
      this.compareSectionTotalData.push(tempTotal);
      tempTotal = {
        contentsName: '',
        totalPlayTime: 0,
        totalPlayCount: 0,
        totalPlayRate: 0,
        totalAveragePlayTime: 0,
      };
    }
    if (third.length) {
      third.forEach((item) => {
        tempTotal['contentsName'] = item['contentsName'];
        tempTotal['totalPlayTime'] += item['playTime'];
        tempTotal['totalPlayCount'] += item['playCount'];
        tempTotal['totalPlayRate'] += item['playRate'];
        tempTotal['totalAveragePlayTime'] += item['averagePlayTime'];
      });
      this.compareSectionTotalData.push(tempTotal);
    }
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

  setTableIndex(e:any) {
    e.data.sort((data1, data2) => {
      const value1 = data1[e.field];
      const value2 = data2[e.field];
      let result = null;

      if (value1 == null && value2 != null) {
        result = -1;
      } else if (value1 != null && value2 == null) {
        result = 1;
      } else if (value1 == null && value2 == null) {
        result = 0;
      } else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      } else {
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
      }
      return (e.order * result);
    });
    let i = 1;
    this.playTimeStatisticsDatas.forEach((item) => {
      item['no'] = i;
      i += 1;
    });
  }
}
