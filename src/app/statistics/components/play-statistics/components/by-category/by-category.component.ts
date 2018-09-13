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
  @Input() selectFolder;

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

  constructor(private cmsApi: CmsApis, private chartService: ChartService) { }

  ngOnInit() {}

  ngOnChanges() {
    this.setTableData();
    this.setChartType();
    this.setChartData();
  }

  setChartType() {
    const temp = document.getElementsByClassName('changeType');
    for (let i = 0; i < temp.length; i += 1) {
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

    this.chartService.getLists(this.cmsApi.byCategoryChart + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1])
      .toPromise()
      .then((cont) => {
        const list = JSON.parse(cont['_body']);
        this.chartLabels = list['label'];
        this.chartData = list['data'];
      });
  }

  setTableData() {
    this.categoryStatisticsLists = [];
    this.chartService.getLists(this.cmsApi.byCategoryTable + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1])
      .toPromise()
      .then((cont) => {
        const list = JSON.parse(cont['_body']);
        list['list'].sort((a, b) => {
          return (a.playCount > b.playCount) ? -1 : ((b.playCount > a.playCount) ? 1 : 0);
        });
        let i = 1;
        const rankingArray:any[] = list['list'].map((item) => {
          item.ranking = i;
          i += 1;
          return item;
        });
        rankingArray.forEach((item) => {
          this.categoryStatisticsLists.push(item);
        });
        this.setTotalData();
      });
  }

  setTotalData() {
    this.totalData = {
      totalCategory: 0,
      totalContentsCount: 0,
      totalPlayCount: 0,
    };
    this.categoryStatisticsLists.forEach((item) => {
      this.totalData['totalContentsCount'] += item['contentsCount'];
      this.totalData['totalPlayCount'] += item['playCount'];
    });
  }

  changeChartType(e) {
    const temp = e.currentTarget.parentNode.children;
    for (let i = 0 ; i < temp.length ; i += 1) {
      temp[i].setAttribute('class', 'changeType');
    }

    if (e.currentTarget.getAttribute('id') === 'line-type') {
      e.currentTarget.setAttribute('class', 'changeType on');
      this.chartType = 'bar';
    } else {
      e.currentTarget.setAttribute('class', 'changeType on');
      this.chartType = 'pie';
    }
  }
}
