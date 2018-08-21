/**
 * Created by GRE511 on 2018-08-21.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']})

export class DashboardComponent implements OnInit {
  public params:Params;

  /*pie chart test*/
  public pieChartLabels:string[] = ['현재 사용량', '남은 용량'];
  public pieChartData:number[] = [30, 70];
  public pieChartData2:number[] = [60, 40];

  /*bar chart test*/
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true};
  public barChartLabels:string[] = ['9/1', '9/2', '9/3', '9/4', '9/5', '9/6', '9/7'];
  public barChartData:any[] = [
    { data: [65, 59, 80, 81, 56, 55, 80], label: '' }];

  // lineChart
  public lineChartData:any[] = [
    { data: [10000, 10600, 10555, 9400, 10030, 8700, 12500], label: '' }];
  public lineChartLabels:any[] = ['9/1', '9/2', '9/3', '9/4', '9/5', '9/6', '9/7'];
  public lineChartOptions:any = { responsive: true };
  public lineChartColors:any[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'},
  ];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });
  }

  public chartClicked(e:any) {
    // if (e.active[0]['_index'] === 0) {
    //   this.router.navigate('/', 'contents');
    // }
    console.log(e);
  }
}
