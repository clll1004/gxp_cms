/**
 * Created by GRE511 on 2018-08-21.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']})

export class DashboardComponent implements OnInit {
  public params:Params;

  /*pie chart test*/
  public pieChartLabels:any[] = ['현재 사용량', '남은 용량'];
  public pieChartData:any[] = [30, 70];
  public chartDataSet:any;
  public chartOptions:any;
  public chartOptions2:any;

  /*bar chart test*/
  public barChartLabels:any[] = ['9/1', '9/2', '9/3', '9/4', '9/5', '9/6', '9/7'];
  public barChartData:any[] = [65, 59, 80, 81, 56, 55, 80];
  public barChartDataSet:any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });
    this.chartDataSet = {
      labels: this.pieChartLabels,
      datasets: [
        {
          label: '재생수',
          data: this.pieChartData,
          backgroundColor: ['#ffcdd2', '#e1bee7'],
        }],
    };
    this.barChartDataSet = {
      labels: this.barChartLabels,
      datasets: [
        {
          label: '트래픽',
          data: this.barChartData,
          fill: false,
          backgroundColor: ['#ffcdd2', '#e1bee7', '#c5cae9', '#bbdefb', '#b2ebf2', '#b2dfdb', '#c8e6c9', '#f8bbd0'],
        }],
    };
    this.chartOptions = {
      legend: {
        position: 'top',
      },
    };
    this.chartOptions2 = {
      legend: {
        display: false,
      },
    };
  }

  chartClicked(e:any) {
    console.log(e);
  }
}
