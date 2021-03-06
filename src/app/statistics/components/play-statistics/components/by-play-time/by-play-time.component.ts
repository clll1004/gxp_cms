/**
 * Created by GRE511 on 2018-09-03.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartService } from '../../../../../services/apis/cms/chart/chart.service';
import { CmsApis } from '../../../../../services/apis/apis';

@Component({
  selector: 'by-play-time',
  templateUrl: './by-play-time.component.html',
  styleUrls: ['../../play-statistics.component.css'],
  providers: [CmsApis, ChartService]})

export class ByPlayTimeComponent implements OnInit, OnChanges {
  @Input() pathName;
  @Input() selectDuration;

  public isShow:boolean = false;
  public popupMessage:string = '';

  public isTableLoading:boolean = false;
  public isChartLoading:boolean = false;
  public isResultTableLoading:boolean = false;

  public selectFolder:object = { label:'카테고리 선택', value: null };
  public searchKey:string = '';
  public searchCount:number = 0;
  public isSearch:boolean = false;

  public isCompareStatus:boolean = false;

  public chartType:string = 'line';
  public chartLabels:any[] = [];
  public chartData:any[] = [];
  public chartOptions: any;
  public dateArray:any[] = [];
  public tempCompareItems:any[] = [];
  public compareItems:any[] = [];
  /*table cols*/
  public playTimeStatisticsCols:any[] = [
    { header: '', field: '', width: '5%' },
    { header: 'No', field: 'no', width: '5%' },
    { header: '그룹명', field: 'groupName', width: '10%' },
    { header: '폴더명', field: 'folderName', width: '10%' },
    { header: '파일명', field: 'contentsName', width: '30%' },
    { header: '영상시간', field: 'duration', width: '7%' },
    { header: '재생시간', field: 'playTime', width: '7%' },
    { header: '재생수', field: 'playCount', width: '6%' },
    { header: '평균재생시간', field: 'averagePlayTime', width: '8%' },
    { header: '등록일', field: 'regdate', width: '13%' },
  ];
  public compareHeaderCols:any[] = [
    { header: '', field: '', width: '15%' },
    { header: '폴더명', field: 'folderName', width: '10%' },
    { header: '파일명', field: 'contentsName', width: '35%' },
    { header: '재생시간', field: 'playTime', width: '10%' },
    { header: '재생수', field: 'playCount', width: '10%' },
    { header: '평균재생시간', field: 'averagePlayTime', width: '10%' },
    { header: '', field: '', width: '10%' },
  ];
  public compareResultHeaderCols:any[] = [
    { header: '파일명', field: 'contentsName', width: '30%' },
    { header: '그룹명', field: 'groupName' },
    { header: '폴더명', field: 'folderName' },
    { header: '일자', field: 'date' },
    { header: '재생시간', field: 'playTime' },
    { header: '재생수', field: 'playCount' },
    { header: '평균재생시간', field: 'averagePlayTime' },
  ];
  /*table data*/
  public playTimeStatisticsDatas:any[] = [];
  /*chart data*/
  public comparePlayTimeChartData:object;
  public comparePlayTimeTableDatas:any[] = [];
  public compareSectionTotalData:any[] = [];

  public apiParameter:string = '';
  public apiSearchKey:string = '';

  constructor(private cmsApi: CmsApis, private chartService: ChartService) { }

  ngOnInit() { }

  ngOnChanges() {
    this.isSearch = false;
    this.searchKey = '';
    this.searchCount = 0;
    this.chartType = this.selectDuration.range === 't' ? 'bar' : 'line';
    const startDate = new Date(this.selectDuration.date[0]);
    const endDate = new Date(this.selectDuration.date[1]);
    this.dateArray = this.getDateArray(startDate, endDate);
    this.initialize();
    this.setTableData(false);
  }

  isShowPopup(e:boolean) {
    this.isShow = e;
  }

  categorySearch(e) {
    this.selectFolder = e;
    this.initialize();
    if (!this.apiSearchKey) {
      this.apiParameter = '&category=' + (this.selectFolder['value'] === null ? '' : this.selectFolder['value']) + '&content_nm=';
    } else {
      this.apiParameter = '&category=' + (this.selectFolder['value'] === null ? '' : this.selectFolder['value']) + '&content_nm=' + this.apiSearchKey;
    }
    this.setTableData(true);
  }

  search() {
    if (this.searchKey) {
      this.isSearch = true;
      this.initialize();
      this.apiSearchKey = this.searchKey;
      if (!this.selectFolder['value']) {
        this.apiParameter = '&category=&content_nm=' + this.apiSearchKey;
      } else {
        this.apiParameter = '&category=' + (this.selectFolder['value'] === null ? '' : this.selectFolder['value']) + '&content_nm=' + this.apiSearchKey;
      }
      this.setTableData(true, true);
    } else {
      this.popupMessage = '검색어를 입력해 주세요.';
      this.isShowPopup(true);
    }
  }

  resetList() {
    if (this.searchKey === '' && this.isSearch) {
      this.isSearch = false;
      this.setTableData();
    }
  }

  initialize() {
    this.isCompareStatus = false;
    this.playTimeStatisticsDatas = [];
    this.tempCompareItems = [];
    this.compareItems = [];
    this.comparePlayTimeChartData = {};
    this.comparePlayTimeTableDatas = [];
    this.compareSectionTotalData = [];
  }

  setTableData(search:boolean = false, keySearch:boolean = false) {
    this.isTableLoading = true;
    let api:string = '';
    if (!search) {
      api = this.cmsApi.byPlayTimeTable + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1];
    } else {
      api = this.cmsApi.byPlayTimeTable + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1] + this.apiParameter;
    }
    this.playTimeStatisticsDatas = [];

    this.chartService.getLists(api)
      .then((list) => {
        if (list['list']) {
          const temp:any[] = [];
          let i = 1;
          list['list'].forEach((item) => {
            temp.push({
              no: i,
              groupName: item.group,
              contentsName: item.content,
              duration: item.duration,
              playTime: item.runtime,
              playCount: item.playCount,
              averagePlayTime: item.avgPlaytime,
              regdate: item.regdate,
              ft_seq: item.ft_seq,
            });
            i += 1;
          });
          temp.sort((a, b) => {
            return new Date(b.regdate).getTime() - new Date(a.regdate).getTime();
          });
          this.playTimeStatisticsDatas = temp;
          this.tempCompareItems = [this.playTimeStatisticsDatas[0]];
          this.compareItems = this.tempCompareItems;

          if (search && keySearch) {
            this.searchCount = list['list'].length;
          }

          this.showSingleResult();
        }
      })
      .then(() => {
        this.isTableLoading = false;
      })
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
      this.popupMessage = '2개까지 선택하실 수 있습니다.';
      this.isShowPopup(true);
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
      this.popupMessage = '비교할 파일을 선택해주세요.';
      this.isShowPopup(true);
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
    this.isChartLoading = true;
    const tempDataSets:any[] = [];
    let i:number = 0;
    const bdc:any[] = ['#ffcdd2', '#e1bee7', '#c5cae9'];
    this.compareItems.forEach((item) => {
      this.chartService.getLists(this.cmsApi.byPlayTimeChart + 'ft_seq=' + item.ft_seq + '&sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1])
        .then((list) => {
          this.chartLabels = list['label'].map((val) => {
            const temp = new Date(val);
            return ((temp.getMonth() + 1) < 10 ? '0' + (temp.getMonth() + 1) : (temp.getMonth() + 1)) + '/' + ((temp.getDate() < 10 ? '0' + temp.getDate() : temp.getDate()));
          });
          tempDataSets.push(
            {
              label: item['contentsName'],
              data: list['data'],
              fill: false,
            });
          if (tempDataSets) {
            let j = 0;
            tempDataSets.forEach((data) => {
              data['borderColor'] = bdc[j];
              data['backgroundColor'] = bdc[j];
              j += 1;
            });
          }
          this.setChart(tempDataSets);
        });
      i += 1;
    });
    this.isChartLoading = false;

    this.chartOptions = {
      legend: {
        position: 'bottom',
      },
      elements: {
        line: {
          tension: 0,
        },
      },
      scales: {
        xAxes: [{
          maxBarThickness: 100,
        }],
        yAxes: [{
          ticks: {
            beginAtZero:true,
            userCallback: (label) => {
              if (Math.floor(label) === label) {
                return label;
              }
            },
          },
        }],
      },
    };
  }

  setChart(tempData) {
    this.comparePlayTimeChartData = {
      labels: this.chartLabels,
      datasets: tempData,
    };
  }

  setCompareTableData() {
    this.isResultTableLoading = true;
    this.comparePlayTimeTableDatas = [];

    this.compareItems.forEach((item) => {
      this.chartService.getLists(this.cmsApi.byPlayTimeResultTable + 'ft_seq=' + item.ft_seq + '&sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1])
        .then((val) => {
          const length = val['detail']['data'].length;
          for (let i = 0 ; i < length ; i += 1) {
            const date = new Date(val['detail']['label'][i]);
            this.comparePlayTimeTableDatas.push({
              contentsName: val['content'],
              groupName: val['group'],
              folderName: val['category'],
              dates: date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()),
              playTime: val['detail']['playTime'][i],
              playCount: val['detail']['data'][i],
              averagePlayTime: val['detail']['averagePlayTime'][i],
            });
          }
          this.setCompareTableAverageData();
        });
      this.isResultTableLoading = false;
    });
  }

  setCompareTableAverageData() {
    const length = this.dateArray.length;
    const first = this.comparePlayTimeTableDatas.slice(0, length);
    const second = this.comparePlayTimeTableDatas.slice(length, length * 2);
    const third = this.comparePlayTimeTableDatas.slice(length * 2, length * 3);
    let tempTotal:object = {
      contentsName: '',
      totalPlayCount: 0,
      totalPlayTime: 0,
      totalAveragePlayTime: 0,
      avgPlayTime: 0,
      avgAveragePlayTime: 0,
    };
    this.compareSectionTotalData = [];
    let playTimeArray:any[] = [];
    let averagePlayTimeArray:any[] = [];

    first.forEach((item) => {
      tempTotal['contentsName'] = item['contentsName'];
      tempTotal['totalPlayCount'] += item['playCount'];
      playTimeArray.push(item['playTime'].split(':'));
      averagePlayTimeArray.push(item['averagePlayTime'].split(':'));
    });

    let convertPlayTimeToSS:any[] = playTimeArray.map((item) => {
      return this.convertDateTimeTo('ss', item);
    });
    convertPlayTimeToSS.forEach((item) => {
      tempTotal['totalPlayTime'] += item;
    });
    tempTotal['avgPlayTime'] = this.convertDateTimeTo('hh:mm:ss', Math.floor(tempTotal['totalPlayTime'] / length));
    tempTotal['totalPlayTime'] = this.convertDateTimeTo('hh:mm:ss', tempTotal['totalPlayTime']);

    let convertAveragePlayTimeToSS:any[] = averagePlayTimeArray.map((item) => {
      return this.convertDateTimeTo('ss', item);
    });
    convertAveragePlayTimeToSS.forEach((item) => {
      tempTotal['totalAveragePlayTime'] += item;
    });
    tempTotal['totalAveragePlayTime'] = Math.floor(tempTotal['totalAveragePlayTime'] / length);
    tempTotal['avgAveragePlayTime'] = this.convertDateTimeTo('hh:mm:ss', Math.floor(tempTotal['totalAveragePlayTime'] / length));
    tempTotal['totalAveragePlayTime'] = this.convertDateTimeTo('hh:mm:ss', Math.floor(tempTotal['totalAveragePlayTime']));

    this.compareSectionTotalData.push(tempTotal);
    if (second.length) {
      tempTotal = {
        contentsName: '',
        totalPlayCount: 0,
        totalPlayTime: 0,
        totalAveragePlayTime: 0,
        avgPlayTime: 0,
        avgAveragePlayTime: 0,
      };
      playTimeArray = [];
      averagePlayTimeArray = [];
      second.forEach((item) => {
        tempTotal['contentsName'] = item['contentsName'];
        tempTotal['totalPlayCount'] += item['playCount'];
        playTimeArray.push(item['playTime'].split(':'));
        averagePlayTimeArray.push(item['averagePlayTime'].split(':'));
      });

      convertPlayTimeToSS = playTimeArray.map((item) => {
        return this.convertDateTimeTo('ss', item);
      });
      convertPlayTimeToSS.forEach((item) => {
        tempTotal['totalPlayTime'] += item;
      });
      tempTotal['avgPlayTime'] = this.convertDateTimeTo('hh:mm:ss', Math.floor(tempTotal['totalPlayTime'] / length));
      tempTotal['totalPlayTime'] = this.convertDateTimeTo('hh:mm:ss', tempTotal['totalPlayTime']);

      convertAveragePlayTimeToSS = averagePlayTimeArray.map((item) => {
        return this.convertDateTimeTo('ss', item);
      });
      convertAveragePlayTimeToSS.forEach((item) => {
        tempTotal['totalAveragePlayTime'] += item;
      });
      tempTotal['totalAveragePlayTime'] = Math.floor(tempTotal['totalAveragePlayTime'] / length);
      tempTotal['avgAveragePlayTime'] = this.convertDateTimeTo('hh:mm:ss', Math.floor(tempTotal['totalAveragePlayTime'] / length));
      tempTotal['totalAveragePlayTime'] = this.convertDateTimeTo('hh:mm:ss', Math.floor(tempTotal['totalAveragePlayTime']));

      this.compareSectionTotalData.push(tempTotal);
    }
    if (third.length) {
      tempTotal = {
        contentsName: '',
        totalPlayTime: 0,
        totalPlayCount: 0,
        totalAveragePlayTime: 0,
        avgPlayTime: 0,
        avgAveragePlayTime: 0,
      };
      third.forEach((item) => {
        tempTotal['contentsName'] = item['contentsName'];
        tempTotal['totalPlayCount'] += item['playCount'];
        playTimeArray.push(item['playTime'].split(':'));
        averagePlayTimeArray.push(item['averagePlayTime'].split(':'));
      });

      convertPlayTimeToSS = playTimeArray.map((item) => {
        return this.convertDateTimeTo('ss', item);
      });
      convertPlayTimeToSS.forEach((item) => {
        tempTotal['totalPlayTime'] += item;
      });
      tempTotal['avgPlayTime'] = this.convertDateTimeTo('hh:mm:ss', Math.floor(tempTotal['totalPlayTime'] / length));
      tempTotal['totalPlayTime'] = this.convertDateTimeTo('hh:mm:ss', tempTotal['totalPlayTime']);

      convertAveragePlayTimeToSS = averagePlayTimeArray.map((item) => {
        return this.convertDateTimeTo('ss', item);
      });
      convertAveragePlayTimeToSS.forEach((item) => {
        tempTotal['totalAveragePlayTime'] += item;
      });
      tempTotal['totalAveragePlayTime'] = Math.floor(tempTotal['totalAveragePlayTime'] / length);
      tempTotal['avgAveragePlayTime'] = this.convertDateTimeTo('hh:mm:ss', Math.floor(tempTotal['totalAveragePlayTime'] / length));
      tempTotal['totalAveragePlayTime'] = this.convertDateTimeTo('hh:mm:ss', Math.floor(tempTotal['totalAveragePlayTime']));

      this.compareSectionTotalData.push(tempTotal);
    }
  }

  convertDateTimeTo(type:string = 'hh:mm:ss', time) {
    if (type === 'ss') {
      return (Number(time[0]) * 60 * 60) + (Number(time[1]) * 60) + Number(time[2]);
    }
    let hours:string = String(Math.floor(time / 3600));
    let minutes:string = String(Math.floor((time - (Number(hours) * 3600)) / 60));
    let seconds:string = String(time - (Number(hours) * 3600) - (Number(minutes) * 60));
    if (Number(hours) < 10) { hours = `0${hours}`; }
    if (Number(minutes) < 10) { minutes = `0${minutes}`; }
    if (Number(seconds) < 10) { seconds = `0${seconds}`; }
    return `${hours}:${minutes}:${seconds}`;
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
    this.setCompareTableData();
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
