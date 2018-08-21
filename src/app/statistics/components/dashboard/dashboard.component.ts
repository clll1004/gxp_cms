/**
 * Created by GRE511 on 2018-08-21.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
// import Chart from 'chart.js';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']})

export class DashboardComponent implements OnInit {
  public params:Params;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });

    // const ctx = document.getElementById('myChart').getContext('2d');
    // const chart = new Chart(ctx, {
    //   // The type of chart we want to create
    //   type: 'line',
    //
    //   // The data for our dataset
    //   data: {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //     datasets: [{
    //       label: 'My First dataset',
    //       backgroundColor: 'rgb(255, 99, 132)',
    //       borderColor: 'rgb(255, 99, 132)',
    //       data: [0, 10, 5, 2, 20, 30, 45],
    //     }] },
    //
    //   // Configuration options go here
    //   options: {} });
  }
}
