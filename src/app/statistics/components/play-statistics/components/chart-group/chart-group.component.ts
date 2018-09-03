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
  public chartDataSet:any;
  public chartOptions:any;
  public backgroundColors:any[] = ['#ffcdd2', '#e1bee7', '#c5cae9', '#bbdefb', '#b2ebf2', '#b2dfdb', '#c8e6c9', '#f8bbd0'];

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    this.setData();
  }

  setData() {
    const tempBackground:any = this.setBackgroundColor();

    this.chartDataSet = {
      labels: this.chartLabels,
      datasets: [
        {
          label: '재생수',
          data: this.chartData,
          fill: this.chartFill,
          backgroundColor: tempBackground,
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

  setBackgroundColor() {
    const backgroundLength = this.backgroundColors.length;
    const chartLength = this.chartLabels.length;
    let tempBackground:any;
    if (this.chartType === 'pie' || this.chartType === 'bar') {
      tempBackground = [];
      let i = 0;
      let count = 0;
      do {
        tempBackground.push(this.backgroundColors[i]);
        i += 1;
        if (i > backgroundLength) {
          i = 0;
        }
        count += 1;
      } while (count < chartLength);
    } else {
      tempBackground = '#ff6400';
    }
    return tempBackground;
  }
}
