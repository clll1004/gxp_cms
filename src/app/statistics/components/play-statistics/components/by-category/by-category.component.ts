/**
 * Created by GRE511 on 2018-09-03.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartService } from '../../../../../services/apis/cms/chart/chart.service';
import { CmsApis } from '../../../../../services/apis/apis';

@Component({
  selector: 'by-category',
  templateUrl: './by-category.component.html',
  styleUrls: ['../../play-statistics.component.css'],
  providers: [CmsApis, ChartService]})

export class ByCategoryComponent implements OnInit, OnChanges {
  @Input() pathName;
  @Input() selectDuration;

  public isChartLoading:boolean = false;
  public isTableLoading:boolean = false;

  public selectFolder:object = { label:'카테고리 선택', value: null };
  public searchKey:string = '';
  public searchCount:number = 0;
  public isSearch:boolean = false;
  public isShow:boolean = false;

  public chartType: string = 'bar';
  public chartLabels: any[] = [];
  public chartData: any[] = [];
  public chartOptions: any;
  /*table cols*/
  public categoryStatisticsCols:any[] = [
    { header: '순위', field: 'ranking' },
    { header: '카테고리', field: 'category' },
    { header: '등록영상 수', field: 'contentsCount' },
    { header: '재생수', field: 'playCount' },
  ];
  /*table data*/
  public categoryStatisticsLists:any[] = [];
  public totalData:object = {
    totalCategory: 0,
    totalContentsCount: 0,
    totalPlayCount: 0,
    averagePlayRate: 0,
  };

  public apiParameter:string = '';
  public apiSearchKey:string = '';

  constructor(private cmsApi: CmsApis, private chartService: ChartService) { }

  ngOnInit() {}

  ngOnChanges() {
    this.isSearch = false;
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
      this.isSearch = true;
      this.apiSearchKey = this.searchKey;
      if (!this.selectFolder['value']) {
        this.apiParameter = '&category=&content_nm=' + this.apiSearchKey;
      } else {
        this.apiParameter = '&category=' + (this.selectFolder['value'] === null ? '' : this.selectFolder['value']) + '&content_nm=' + this.apiSearchKey;
      }
      this.setChartData(true, true);
      this.setTableData(true);
    } else {
      this.isShowPopup(true);
    }
  }

  isShowPopup(e:boolean) {
    this.isShow = e;
  }

  resetList() {
    if (this.searchKey === '' && this.isSearch) {
      this.isSearch = false;
      this.setChartData();
      this.setTableData();
    }
  }

  setChartType() {
    this.chartType = 'bar';
    const barType = document.getElementById('bar-type');
    const pieType = document.getElementById('pie-type');
    barType.setAttribute('class', 'on changeType');
    pieType.setAttribute('class', 'changeType');
  }

  setChartData(search:boolean = false, keySearch:boolean = false) {
    this.isChartLoading = true;
    let api:string = '';
    if (!search) {
      api = this.cmsApi.byCategoryChart + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1];
    } else {
      api = this.cmsApi.byCategoryChart + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1] + this.apiParameter;
    }
    this.chartLabels = [];
    this.chartData = [];

    this.chartService.getLists(api)
      .then((list) => {
        this.chartLabels = list['label'];
        this.chartData = list['data'];
        if (search && keySearch) {
          this.searchCount = list['label'].length;
        }
      })
      .then(() => {
        this.isChartLoading = false;
      });
  }

  setTableData(search:boolean = false) {
    this.isTableLoading = true;
    let api:string = '';
    if (!search) {
      api = this.cmsApi.byCategoryTable + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1];
    } else {
      api = this.cmsApi.byCategoryTable + 'sdate=' + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1] + this.apiParameter;
    }
    this.categoryStatisticsLists = [];

    this.chartService.getLists(api)
      .then((data) => {
        const list = data['list'] === null ? [] : data['list'];
        list.sort((a, b) => {
          return (a.playCount > b.playCount) ? -1 : ((b.playCount > a.playCount) ? 1 : 0);
        });
        let i = 1;
        const rankingArray:any[] = list.map((item) => {
          item.ranking = i;
          i += 1;
          return item;
        });
        this.categoryStatisticsLists = rankingArray;
        this.setTotalData();
      })
      .then(() => {
        this.isTableLoading = false;
      });
  }

  setTotalData() {
    this.totalData = {
      totalCategory: 0,
      totalContentsCount: 0,
      totalPlayCount: 0,
    };
    const arr:any[] = [];
    this.categoryStatisticsLists.forEach((item) => {
      if (arr.indexOf(item['category'])) {
        arr.push(item['category']);
        this.totalData['totalCategory'] += 1;
      }
      this.totalData['totalContentsCount'] += item['contentsCount'];
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
