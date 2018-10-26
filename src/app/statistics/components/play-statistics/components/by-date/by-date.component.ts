/**
 * Created by GRE511 on 2018-09-03.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartService } from '../../../../../services/apis/cms/chart/chart.service';
import { CmsApis } from '../../../../../services/apis/apis';

@Component({
  selector: 'by-date',
  templateUrl: './by-date.component.html',
  styleUrls: ['../../play-statistics.component.css'],
  providers: [CmsApis, ChartService]})

export class ByDateComponent implements OnInit, OnChanges {
  @Input() pathName;
  @Input() selectDuration;

  public isChartLoading:boolean = false;
  public isTableLoading:boolean = false;

  public selectFolder:object = { label:'카테고리 선택', value: null };
  public searchCount:number = 0;

  public chartType: string = 'line';
  public chartLabels: any[] = [];
  public chartData: any[] = [];
  /*table cols*/
  public dateStatisticsCols: any[] = [
    { header: '날짜', field: 'date' },
    { header: '요청된 콘텐츠 수', field: 'contentsCount' },
    { header: '재생수', field: 'playCount' },
    { header: '재생시간', field: 'playTime' },
    { header: '평균 재생시간', field: 'averagePlayTime' },
    { header: '전일 대비 재생 수 증감', field: 'variation' },
  ];
  /*table data*/
  public dateStatisticsLists: any[] = [];
  public totalData:object = {
    totalContentsCount: 0,
    totalPlayCount: 0,
    averagePlayCount: 0,
    totalPlayTime: 0,
    averageTotalPlayTime: 0,
  };

  constructor(private cmsApi: CmsApis, private chartService: ChartService) { }

  ngOnInit() {}

  ngOnChanges() {
    this.chartType = this.selectDuration.range === 't' ? 'bar' : 'line';
    this.searchCount = 0;
    this.setChartData(false);
    this.setTableData(false);
  }

  categorySearch(e) {
    this.selectFolder = e;
    this.setChartData(true);
    this.setTableData(true);
  }

  setChartData(search:boolean) {
    this.isChartLoading = true;
    let api:string = '';
    if (!search) {
      api = this.cmsApi.byDateChart + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1];
    } else {
      api = this.cmsApi.byDateChart + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1] + '&category=' + (this.selectFolder['value'] === null ? '' : this.selectFolder['value']) + '&content_nm=';
    }
    this.chartLabels = [];
    this.chartData = [];

    this.chartService.getLists(api)
      .then((list) => {
        this.chartLabels = list['label'].map((item) => {
          const temp = new Date(item);
          return ((temp.getMonth() + 1) < 10 ? '0' + (temp.getMonth() + 1) : (temp.getMonth() + 1)) + '/' + ((temp.getDate() < 10 ? '0' + temp.getDate() : temp.getDate()));
        });
        this.chartData = list['data'];
        if (search) {
          this.searchCount = list['label'].length;
        }
      })
      .then(() => {
        this.isChartLoading = false;
      });
  }

  setTableData(search:boolean) {
    this.isTableLoading = true;
    let api:string = '';
    if (!search) {
      api = this.cmsApi.byDateTable + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1];
    } else {
      api = this.cmsApi.byDateTable + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1] + '&category=' + (this.selectFolder['value'] === null ? '' : this.selectFolder['value'])  + '&content_nm=';
    }
    this.dateStatisticsLists = [];

    this.chartService.getLists(api)
      .then((list) => {
        this.dateStatisticsLists = list['list'];
        this.dateStatisticsLists.reverse();
        this.setTotalData();
      })
      .then(() => {
        this.isTableLoading = false;
      });
  }

  setTotalData() {
    const length = this.dateStatisticsLists.length;
    const playTimeArray:any[] = [];
    const averagePlayTimeArray:any[] = [];
    this.totalData = {
      totalContentsCount: 0,
      totalPlayCount: 0,
      averagePlayCount: 0,
      totalPlayTime: 0,
      averageTotalPlayTime: 0,
    };
    this.dateStatisticsLists.forEach((item) => {
      this.totalData['totalContentsCount'] += item['contentsCount'];
      this.totalData['totalPlayCount'] += item['playCount'];
      playTimeArray.push(item['playTime'].split(':'));
      averagePlayTimeArray.push(item['averagePlayTime'].split(':'));
    });

    const convertPlayTimeToSS:any[] = playTimeArray.map((item) => {
      return this.convertDateTimeTo('ss', item);
    });
    convertPlayTimeToSS.forEach((item) => {
      this.totalData['totalPlayTime'] += item;
    });

    const convertAveragePlayTimeToSS:any[] = averagePlayTimeArray.map((item) => {
      return this.convertDateTimeTo('ss', item);
    });
    convertAveragePlayTimeToSS.forEach((item) => {
      this.totalData['averageTotalPlayTime'] += item;
    });

    this.totalData['averagePlayCount'] = Math.floor(this.totalData['totalPlayCount'] / length);
    this.totalData['totalPlayTime'] = this.convertDateTimeTo('hh:mm:ss', Math.floor(this.totalData['totalPlayTime'] / length));
    this.totalData['averageTotalPlayTime'] = this.convertDateTimeTo('hh:mm:ss', Math.floor(this.totalData['averageTotalPlayTime'] / length));
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
}
