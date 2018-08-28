/**
 * Created by GRE511 on 2018-08-27.
 */
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'chart-group',
  templateUrl: 'chart-group.component.html'})

export class ChartGroupComponent implements OnInit, OnChanges {
  @Input() chartType:string;
  @Input() chartFill:string;
  @Input() chartLabels:string;
  @Input() chartData:string;
  @Input() borderColor:string;
  public chartDataSet:any;
  public chartOptions:any;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    this.setData();
  }

  setData() {
    this.chartDataSet = {
      labels: this.chartLabels,
      datasets: [
        {
          label: '재생수',
          data: this.chartData,
          fill: this.chartFill,
          borderColor: this.borderColor,
        }],
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
}
