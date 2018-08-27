/**
 * Created by GRE511 on 2018-08-27.
 */
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'charts',
  templateUrl: 'charts.component.html'})

export class ChartsComponent implements OnInit, OnChanges {
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
          label: 'First Dataset',
          data: this.chartData,
          fill: this.chartFill,
          borderColor: this.borderColor,
        }],
    };
    this.chartOptions = {
      legend: {
        display: false,
      },
      elements: {
        line: {
          tension: 0,
        },
      },
    };
  }

  chartTypeChange(e) { }
}
