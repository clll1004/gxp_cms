/**
 * Created by GRE511 on 2018-08-24.
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'show-statistics',
  templateUrl: './show-statistics.component.html'})

export class ShowStatisticsComponent implements OnInit, OnChanges {
  @Input() selectDuration;
  @Input() selectFolder;
  public chartLabels:any[] = [];
  public chartData:any[] = [];

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    this.setChartData();
  }

  setChartData() {
    this.chartLabels = [];
    this.chartData = [];
    const startDate = new Date(this.selectDuration.date[0]);
    const endDate = new Date(this.selectDuration.date[1]);
    // const dateInterval = Math.floor((endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24);
    const dateArray = this.getDateArray(startDate, endDate);
    dateArray.forEach((item) => {
      const random = Math.floor(Math.random() * 10000);
      this.chartLabels.push((item.getMonth() + 1) + '/' + item.getDate());
      this.chartData.push(random);
    });
  }

  getDateArray(startDate, endDate) {
    const dateArray:any[] = [];
    const currentDate = startDate;
    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }
}
