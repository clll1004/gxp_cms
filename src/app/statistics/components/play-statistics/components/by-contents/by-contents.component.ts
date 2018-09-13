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
  @Input() selectFolder;

  public chartType: string = 'bar';
  public chartLabels: any[] = [];
  public chartData: any[] = [];
  /*table cols*/
  public contentsStatisticsCols:any[] = [
    { header: '순위', field: 'ranking' },
    { header: '카테고리', field: 'category' },
    { header: '콘텐츠 명', field: 'content' },
    { header: '재생수', field: 'playCount' },
    { header: '등록일', field: 'updateDate' },
  ];
  /*table data*/
  public contentsStatisticsLists:any[] = [];
  public totalData:object = {
    totalPlayCount: 0,
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

    this.chartService.getLists(this.cmsApi.byContentsChart + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1])
      .toPromise()
      .then((cont) => {
        const list = JSON.parse(cont['_body']);
        // const labelLengthLimit:any[] = list['label'].map((item) => {
        //   return item.length > 10 ? item.substring(0, 10) + '...' : item;
        // });
        this.chartLabels = list['label'];
        this.chartData = list['data'];
      });
  }

  setTableData() {
    this.contentsStatisticsLists = [];
    this.chartService.getLists(this.cmsApi.byContentsTable + this.selectDuration.date[0] + '&edate=' + this.selectDuration.date[1])
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
          this.contentsStatisticsLists.push(item);
        });
        this.setTotalData();
      });
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

    if (e.currentTarget.getAttribute('id') === 'line-type') {
      e.currentTarget.setAttribute('class', 'changeType on');
      this.chartType = 'bar';
    } else {
      e.currentTarget.setAttribute('class', 'changeType on');
      this.chartType = 'pie';
    }
  }
}
