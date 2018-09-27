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

  public selectFolder:object = { label:'카테고리 선택', value: null };
  public searchKey:string = '';
  public searchCount:number = 0;

  public isCompareStatus:boolean = false;

  public chartType:string = 'line';
  public chartLabels:any[] = [];
  public chartData:any[] = [];
  public chartOptions: any;
  public dateArray:any[] = [];
  public tempCompareItems:any[] = [];
  public compareItems:any[] = [];
  public isShowMessage:boolean = false;
  public isShowCheckLimitMessage:boolean = false;
  /*table cols*/
  public playTimeStatisticsCols:any[] = [
    { header: 'No', field: 'no' },
    { header: '그룹명', field: 'groupName' },
    { header: '폴더명', field: 'folderName' },
    { header: '파일명', field: 'contentsName' },
    { header: '영상 시간', field: 'duration' },
    { header: '재생시간', field: 'playTime' },
    { header: '재생수', field: 'playCount' },
    { header: '평균재생시간', field: 'averagePlayTime' },
    { header: '등록일', field: 'regdate' },
  ];
  public compareHeaderCols:any[] = [
    { header: '폴더명', field: 'folderName' },
    { header: '파일명', field: 'contentsName' },
    { header: '재생시간', field: 'playTime' },
    { header: '재생수', field: 'playCount' },
    { header: '평균재생시간', field: 'averagePlayTime' },
  ];
  public compareResultHeaderCols:any[] = [
    { header: '파일명', field: 'contentsName' },
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

  constructor(private cmsApi: CmsApis, private chartService: ChartService) { }

  ngOnInit() { }

  ngOnChanges() {
    document.getElementById('search-result')['style'].display = 'none';
    this.searchKey = '';
    this.searchCount = 0;
    const startDate = new Date(this.selectDuration.date[0]);
    const endDate = new Date(this.selectDuration.date[1]);
    this.dateArray = this.getDateArray(startDate, endDate);
    this.initialize();
    this.setTableData(false);
  }

  updateChoiceFolder(e) {
    this.selectFolder = e;
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

  setTableData(search:boolean) {
    let api:string = '';
    if (!search) {
      api = this.cmsApi.byPlayTimeTable + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1];
    } else {
      api = this.cmsApi.byPlayTimeTable + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1] +
        '&category=' + (this.selectFolder['value'] === null ? '' : this.selectFolder['value']) + '&content_nm=' + this.searchKey;
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

          if (search) {
            document.getElementById('search-result')['style'].display = 'inline-block';
            this.searchCount = list['list'].length;
          }

          this.showSingleResult();
        }
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
              j += 1;
            });
          }
          this.setChart(tempDataSets);
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

  setChart(tempData) {
    this.comparePlayTimeChartData = {
      labels: this.chartLabels,
      datasets: tempData,
    };
  }

  setCompareTableData() {
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
              playTime: 0,
              playCount: val['detail']['data'][i],
              averagePlayTime: 0,
            });
          }
          this.setCompareTableAverageData();
        });
    });
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
      totalAveragePlayTime: 0,
    };
    this.compareSectionTotalData = [];

    first.forEach((item) => {
      tempTotal['contentsName'] = item['contentsName'];
      tempTotal['totalPlayTime'] += item['playTime'];
      tempTotal['totalPlayCount'] += item['playCount'];
      tempTotal['totalAveragePlayTime'] += item['averagePlayTime'];
    });
    this.compareSectionTotalData.push(tempTotal);
    tempTotal = {
      contentsName: '',
      totalPlayTime: 0,
      totalPlayCount: 0,
      totalAveragePlayTime: 0,
    };
    if (second.length) {
      second.forEach((item) => {
        tempTotal['contentsName'] = item['contentsName'];
        tempTotal['totalPlayTime'] += item['playTime'];
        tempTotal['totalPlayCount'] += item['playCount'];
        tempTotal['totalAveragePlayTime'] += item['averagePlayTime'];
      });
      this.compareSectionTotalData.push(tempTotal);
      tempTotal = {
        contentsName: '',
        totalPlayTime: 0,
        totalPlayCount: 0,
        totalAveragePlayTime: 0,
      };
    }
    if (third.length) {
      third.forEach((item) => {
        tempTotal['contentsName'] = item['contentsName'];
        tempTotal['totalPlayTime'] += item['playTime'];
        tempTotal['totalPlayCount'] += item['playCount'];
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

  search() {
    this.initialize();
    this.setTableData(true);
  }
}
