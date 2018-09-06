/**
 * Created by GRE511 on 2018-09-03.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'by-time',
  templateUrl: './by-time.component.html',
  styleUrls: ['../../play-statistics.component.css'],
  providers: [DatePipe]})

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
    { header: '시간', field: 'time' },
    { header: '재생수', field: 'playCount' },
    { header: '재생율', field: 'playRate' },
    { header: '재생시간', field: 'playTime' },
  ];
  public timeStatisticsLists:any[] = [];
  public timeTableTitle:any[] = [];
  public totalData:any[] = [];

  constructor(private datePipe:DatePipe) { }

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
    this.chartLabels = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
    let tempLabels:any[] = [];
    const tempDataSets:any[] = [];
    let i:number = 0;
    const bdc:any[] = ['#ffcdd2', '#e1bee7', '#c5cae9'];
    this.chartData = [];
    this.multiSelectDuration.forEach((item) => {
      const tempData:any[] = [];
      tempLabels = [];
      this.chartLabels.forEach((label) => {
        const random = Math.floor(Math.random() * 10000);
        tempData.push(random);
        tempLabels.push(label + '시');
      });
      this.chartData.push(tempData);
      tempDataSets.push(
        {
          label: (item.selectDuration.getMonth() + 1) + '/' + item.selectDuration.getDate(),
          data: tempData,
          fill: false,
          borderColor: bdc[i],
        });
      i += 1;
    });
    this.multiChartData = {
      labels: tempLabels,
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
    let i = 0;
    this.multiSelectDuration.forEach((item) => {
      this.durationLength.push(i);
      this.timeTableTitle.push(this.datePipe.transform(item.selectDuration, 'yyyy-MM-dd'));
      i += 1;
    });
    this.timeStatisticsLists = [];

    let tempLists:any[] = [];
    i = 0;
    this.durationLength.forEach(() => {
      let j = 0;
      tempLists = [];
      this.chartLabels.forEach((item) => {
        tempLists.push(
          {
            time: item + '시 ~ ' + ((Number(item) + 1) < 10 ? '0' + (Number(item) + 1) : (Number(item) + 1))  + '시',
            playCount: this.chartData[i][j],
            playRate: 10,
            playTime: 20,
          });
        j += 1;
      });
      this.timeStatisticsLists.push(tempLists);
      i += 1;
    });

    this.setTotalData();
  }

  setTotalData() {
    this.totalData = [];
    let tempTotalData:object = {};
    const length = this.timeStatisticsLists[0].length;
    this.timeStatisticsLists.forEach((item:any[]) => {
      tempTotalData = {
        totalPlayCount: 0,
        averagePlayCount: 0,
        averagePlayRate: 0,
        averagePlayTime: 0,
      };
      item.forEach((value) => {
        tempTotalData['totalPlayCount'] += value['playCount'];
        tempTotalData['averagePlayRate'] += value['playRate'];
        tempTotalData['averagePlayTime'] += value['playTime'];
      });
      tempTotalData['averagePlayCount'] = Math.floor(tempTotalData['totalPlayCount'] / length);
      tempTotalData['averagePlayRate'] = Math.floor(tempTotalData['averagePlayRate'] / length);
      tempTotalData['averagePlayTime'] = Math.floor(tempTotalData['averagePlayTime'] / length);
      this.totalData.push(tempTotalData);
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
