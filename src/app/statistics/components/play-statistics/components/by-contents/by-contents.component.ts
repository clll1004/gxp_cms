/**
 * Created by GRE511 on 2018-09-03.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartService } from '../../../../../services/apis/cms/chart/chart.service';
import { CmsApis } from '../../../../../services/apis/apis';

@Component({
  selector: 'by-contents',
  templateUrl: './by-contents.component.html',
  styleUrls: ['../../play-statistics.component.css'],
  providers: [CmsApis, ChartService]})

export class ByContentsComponent implements OnInit, OnChanges {
  @Input() pathName;
  @Input() selectDuration;

  public isChartLoading:boolean = false;
  public isTableLoading:boolean = false;

  public selectFolder:object = { label:'카테고리 선택', value: null };
  public searchKey:string = '';
  public searchCount:number = 0;
  public isSearchKeyMessage:boolean = false;

  public chartType: string = 'bar';
  public chartLabels: any[] = [];
  public chartData: any[] = [];
  /*table cols*/
  public contentsStatisticsCols:any[] = [
    { header: '순위', field: 'ranking', width: '10%' },
    { header: '카테고리', field: 'category', width: '15%' },
    { header: '파일명', field: 'content', width: '45%' },
    { header: '재생수', field: 'playCount', width: '10%' },
    { header: '등록일', field: 'regdate', width: '20%' },
  ];
  /*table data*/
  public contentsStatisticsLists:any[] = [];
  public totalData:object = {
    totalPlayCount: 0,
  };

  public apiParameter:string = '';
  public apiSearchKey:string = '';

  constructor(private cmsApi: CmsApis, private chartService: ChartService) { }

  ngOnInit() {}

  ngOnChanges() {
    this.searchKey = '';
    this.searchCount = 0;
    this.setChartType();
    this.setChartData(false);
    this.setTableData(false);
  }

  categorySearch(e) {
    this.selectFolder = e;
    if (!this.apiSearchKey) {
      this.apiParameter = '&category=' + (this.selectFolder['value'] === null ? '' : this.selectFolder['value']) + '&content_nm=';
    } else {
      this.apiParameter = '&category=' + (this.selectFolder['value'] === null ? '' : this.selectFolder['value']) + '&content_nm=' + this.apiSearchKey;
    }
    this.setChartData(true);
    this.setTableData(true);
  }

  search() {
    if (this.searchKey) {
      this.apiSearchKey = this.searchKey;
      if (!this.selectFolder['value']) {
        this.apiParameter = '&category=&content_nm=' + this.apiSearchKey;
      } else {
        this.apiParameter = '&category=' + (this.selectFolder['value'] === null ? '' : this.selectFolder['value']) + '&content_nm=' + this.apiSearchKey;
      }
      this.setChartData(true, true);
      this.setTableData(true);
    } else {
      this.isSearchKeyMessage = true;
    }
  }

  setChartType() {
    this.chartType = 'bar';
    const barType = document.getElementById('bar-type');
    const pieType = document.getElementById('pie-type');
    barType.setAttribute('class', 'on changeType');
    pieType.setAttribute('class', 'changeType');
  }

  setChartData(search:boolean, keySearch:boolean = false) {
    this.isChartLoading = true;
    let api:string = '';
    if (!search) {
      api = this.cmsApi.byContentsChart + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1];
    } else {
      api = this.cmsApi.byContentsChart + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1] + this.apiParameter;
    }
    this.chartLabels = [];
    this.chartData = [];

    this.chartService.getLists(api)
      .then((list) => {
        this.chartLabels = list['label'];
        this.chartData = list['data'];
        if (search && keySearch) {
          document.getElementById('search-result')['style'].display = 'inline-block';
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
      api = this.cmsApi.byContentsTable + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1];
    } else {
      api = this.cmsApi.byContentsTable + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1] + this.apiParameter;
    }
    this.contentsStatisticsLists = [];

    this.chartService.getLists(api)
      .then((data) => {
        const list = data['list'] === null ? [] : data['list'];
        let i = 1;
        const setRankingProperty:any[] = list.map((item) => {
          item.ranking = i;
          i += 1;
          return item;
        });
        this.contentsStatisticsLists = setRankingProperty;
        this.setTotalData();
      })
      .then(() => {
        this.isTableLoading = false;
      })
  }

  setTotalData() {
    this.totalData = {
      totalPlayCount: 0,
    };
    this.contentsStatisticsLists.forEach((item) => {
      this.totalData['totalPlayCount'] += item['playCount'];
    });
  }

  changeChartType(e) {
    const temp = e.currentTarget.parentNode.children;
    for (let i = 0 ; i < temp.length ; i += 1) {
      temp[i].setAttribute('class', 'changeType');
    }

    if (e.currentTarget.getAttribute('id') === 'bar-type') {
      e.currentTarget.setAttribute('class', 'changeType on');
      this.chartType = 'bar';
    } else {
      e.currentTarget.setAttribute('class', 'changeType on');
      this.chartType = 'pie';
    }
  }
}
