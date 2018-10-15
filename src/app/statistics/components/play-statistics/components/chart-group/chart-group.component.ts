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
    if (this.chartType === 'pie') {
      this.chartOptions = {
        responsive: false,
        legend: {
          position: 'bottom',
          onClick: null,
        },
        scales: {
          xAxes: [{
            display: false,
          }],
        },
        tooltips: {
          callbacks: {
            title: (tooltipItem, chartData) => {
              return chartData.labels[tooltipItem[0]['index']];
            }
          }
        },
        elements: {
          line: {
            tension: 0,
          },
        },
      };
    } else {
      this.chartOptions = {
        responsive: false,
        legend: {
          position: 'bottom',
          onClick: null,
        },
        scales: {
          xAxes: [{
            ticks: {
              autoSkip: false,
              callback: (value) => {
                if (value.length > 10) {
                  return value.substr(0, 10) + '...'; // truncate
                }
                return value;
              },
            },
          }],
          yAxes: [{
            ticks: {
              beginAtZero:true,
            },
          }],
        },
        tooltips: {
          callbacks: {
            title: (tooltipItem, chartData) => {
              return chartData.labels[tooltipItem[0]['index']];
            }
          }
        },
        elements: {
          line: {
            tension: 0,
          },
        },
      };
    }
  }

  setBackgroundColor() {
    if (this.chartLabels) {
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
        tempBackground = '#ffcdd2';
      }
      return tempBackground;
    }
  }
}
