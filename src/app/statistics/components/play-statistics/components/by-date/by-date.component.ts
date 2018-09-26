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

  public selectFolder:object = { label:'선택해주세요', value: '' };
  public searchKey:string = '';
  public searchCount:number = 0;

  public chartType: string = 'line';
  public chartLabels: any[] = [];
  public chartData: any[] = [];
  public chartOptions: object;
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
    document.getElementById('search-result')['style'].display = 'none';
    this.searchKey = '';
    this.searchCount = 0;
    this.setChartType();
    this.setChartData();
    this.setTableData();
  }

  updateChoiceFolder(e) {
    this.selectFolder = e;
  }

  setChartType() {
    this.chartType = 'line';
    const lineType = document.getElementById('line-type');
    const pieType = document.getElementById('pie-type');
    lineType.setAttribute('class', 'on changeType');
    pieType.setAttribute('class', 'changeType');
  }

  setChartData() {
    this.chartLabels = [];
    this.chartData = [];

    this.chartService.getLists(this.cmsApi.byDateChart + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1])
      .then((list) => {
        this.chartLabels = list['label'].map((item) => {
          const temp = new Date(item);
          return ((temp.getMonth() + 1) < 10 ? '0' + (temp.getMonth() + 1) : (temp.getMonth() + 1)) + '/' + ((temp.getDate() < 10 ? '0' + temp.getDate() : temp.getDate()));
        });
        this.chartData = list['data'];
      });
  }

  setTableData() {
    this.dateStatisticsLists = [];

    this.chartService.getLists(this.cmsApi.byDateTable + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1])
      .then((list) => {
        this.dateStatisticsLists = list['list'];
        this.dateStatisticsLists.reverse();
        this.setTotalData();
      });
  }

  setTotalData() {
    const length = this.dateStatisticsLists.length;
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
      this.totalData['totalPlayTime'] += item['playTime'];
    });
    this.totalData['averagePlayCount'] = Math.floor(this.totalData['totalPlayCount'] / length);
    this.totalData['averageTotalPlayTime'] = Math.floor(this.totalData['totalPlayTime'] / length);
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

  search() {
    this.chartService.getLists(this.cmsApi.byDateChart + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1] + '&category=' + this.selectFolder['value'] + '&content_nm=' + this.searchKey)
      .then((list) => {
        document.getElementById('search-result')['style'].display = 'inline-block';
        if (list['label']) {
          this.searchCount = list['label'].length;
        }
        this.chartLabels = list['label'].map((item) => {
          const temp = new Date(item);
          return ((temp.getMonth() + 1) < 10 ? '0' + (temp.getMonth() + 1) : (temp.getMonth() + 1)) + '/' + ((temp.getDate() < 10 ? '0' + temp.getDate() : temp.getDate()));
        });
        this.chartData = list['data'];
      });
    this.chartService.getLists(this.cmsApi.byDateTable + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1] + '&category=' + this.selectFolder['value'] + '&content_nm=' + this.searchKey)
      .then((list) => {
        this.dateStatisticsLists = list['list'];
        this.dateStatisticsLists.reverse();
        this.setTotalData();
      });
  }
}
