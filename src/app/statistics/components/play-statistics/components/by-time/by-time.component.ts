/**
 * Created by GRE511 on 2018-09-03.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChartService } from '../../../../../services/apis/cms/chart/chart.service';
import { CmsApis } from '../../../../../services/apis/apis';

@Component({
  selector: 'by-time',
  templateUrl: './by-time.component.html',
  styleUrls: ['../../play-statistics.component.css'],
  providers: [DatePipe, CmsApis, ChartService]})

export class ByTimeComponent implements OnInit, OnChanges {
  @Input() pathName:string;
  @Input() multiSelectDuration:any[];
  @Input() selectFolder:object;

  public chartType: string = 'line';
  public chartLabels: any[] = [];
  public chartData: any[] = [];
  public chartOptions: object;
  public multiChartData:object = {};

  public durationLength:any[] = [];
  public timeStatisticsCols:any[] = [
    { header: '시간', field: 'date' },
    { header: '재생수', field: 'playCount' },
    { header: '재생시간', field: 'playTime' },
  ];
  public timeStatisticsLists:any[] = [];
  public timeTableTitle:any[] = [];
  public totalData:any[] = [];
  public tempTotalData:object = {
    totalPlayCount: 0,
    averagePlayCount: 0,
    averagePlayTime: 0,
  };

  constructor(private datePipe:DatePipe, private cmsApi: CmsApis, private chartService: ChartService) { }

  ngOnInit() {
    this.chartData = [];
    this.durationLength = ['0'];
  }

  ngOnChanges() {
    this.setChartType();
    this.setMultiChartData();
    this.setTableData();
  }

  setMultiChartData() {
    const tempDataSets:any[] = [];
    let i:number = 0;
    const bdc:any[] = ['#ffcdd2', '#e1bee7', '#c5cae9'];
    this.chartData = [];
    this.multiSelectDuration.forEach((item) => {
      this.chartService.getLists(this.cmsApi.byTimeChart + this.datePipe.transform(item.selectDuration, 'yyyy-MM-dd') + '&edate=' + this.datePipe.transform(item.selectDuration, 'yyyy-MM-dd'))
        .toPromise()
        .then((cont) => {
          const list = JSON.parse(cont['_body']);
          const tempLabel:any[] = list['label'].map((item) => {
            return item + '시';
          });
          const tempData:any[] = [];
          this.chartData.push(tempData);
          tempDataSets.push(
            {
              label: this.datePipe.transform(item.selectDuration, 'MM-dd'),
              data: list['data'],
              fill: false,
              borderColor: bdc[i],
            });
          i += 1;
          this.multiChartData = {
            labels: tempLabel,
            datasets: tempDataSets,
          };
        });
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

  setTableData() {
    this.durationLength = [];
    this.timeTableTitle = [];
    this.timeStatisticsLists = [];
    let i = 0;
    this.multiSelectDuration.forEach((item) => {
      this.durationLength.push(i);
      this.timeTableTitle.push(this.datePipe.transform(item.selectDuration, 'yyyy-MM-dd'));
      i += 1;

      const tempLists:any[] = [];
      this.chartService.getLists(this.cmsApi.byTimeTable + this.datePipe.transform(item.selectDuration, 'yyyy-MM-dd') + '&edate=' + this.datePipe.transform(item.selectDuration, 'yyyy-MM-dd'))
        .toPromise()
        .then((cont) => {
          const list = JSON.parse(cont['_body']);
          list['list'].forEach((item) => {
            tempLists.push(item);
          });
          this.timeStatisticsLists.push(tempLists);
          this.setTotalData(tempLists.length);
        });
    });
  }

  setTotalData(length) {
    this.totalData = [];
    this.timeStatisticsLists.forEach((item:any[]) => {
      this.tempTotalData = {
        totalPlayCount: 0,
        averagePlayCount: 0,
        averagePlayTime: 0,
      };
      item.forEach((value) => {
        this.tempTotalData['totalPlayCount'] += value['playCount'];
        this.tempTotalData['averagePlayTime'] += value['playTime'];
      });
      this.tempTotalData['averagePlayCount'] = Math.floor(this.tempTotalData['totalPlayCount'] / length);
      this.tempTotalData['averagePlayTime'] = Math.floor(this.tempTotalData['averagePlayTime'] / length);
      this.totalData.push(this.tempTotalData);
    });
  }

  foldingTable(btnId, tableId) {
    const btn = <HTMLElement>document.getElementById(btnId);
    const table = <HTMLElement>document.getElementById(tableId).children[0].children[0].children[0].children[2];
    if (btn.innerHTML === '접기 &gt;') {
      table.style.display = 'none';
      btn.innerText = '펼치기 >';
    } else {
      table.style.display = 'table-row-group';
      btn.innerText = '접기 >';
    }
  }
}
