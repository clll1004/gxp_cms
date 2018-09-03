/**
 * Created by GRE511 on 2018-09-03.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'by-time',
  templateUrl: './by-time.component.html',
  styleUrls: ['../../play-statistics.component.css']})

export class ByTimeComponent implements OnInit, OnChanges {
  @Input() pathName;
  @Input() selectDuration;
  @Input() multiSelectDuration;
  @Input() selectFolder;

  public chartType: string = 'line';
  public chartLabels: any[] = [];
  public chartData: any[] = [];
  public chartOptions: any;
  public dateArray: any[] = [];

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    this.setChartType();
    this.setMultiChartData();
  }

  setMultiChartData() {
    this.chartLabels = ['00시', '01시', '02시', '03시', '04시', '05시', '06시', '07시', '08시', '09시', '10시', '11시', '12시', '13시', '14시', '15시', '16시', '17시', '18시', '19시', '20시', '21시', '22시', '23시' ];
    this.chartLabels.forEach(() => {
      const random = Math.floor(Math.random() * 10000);
      this.chartData.push(random);
    });
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
}
