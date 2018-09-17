/**
 * Created by GRE511 on 2018-08-21.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CmsApis } from '../../../services/apis/apis';
import { DashboardService } from '../../../services/apis/cms/dashboard/dashboard.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [CmsApis, DashboardService]})

export class DashboardComponent implements OnInit {
  public params:Params;

  /*pie chart test*/
  public pieChartLabels:any[] = ['현재 사용량', '남은 용량'];
  public pieChartData:any[] = [30, 70];
  public chartDataSet:object;
  public chartOptions:object;
  public chartOptions2:object;
  public chartOptions3:object;

  public backgroundColors:any[] = ['#ffcdd2', '#e1bee7', '#c5cae9', '#bbdefb', '#b2ebf2', '#b2dfdb', '#c8e6c9', '#f8bbd0', '#ffcdd2', '#e1bee7', '#c5cae9', '#bbdefb', '#b2ebf2', '#b2dfdb', '#c8e6c9', '#f8bbd0', '#ffcdd2', '#e1bee7', '#c5cae9', '#bbdefb', '#b2ebf2', '#b2dfdb', '#c8e6c9', '#f8bbd0', '#ffcdd2', '#e1bee7', '#c5cae9', '#bbdefb', '#b2ebf2', '#b2dfdb', '#c8e6c9', '#f8bbd0'];

  /*날짜별*/
  public dateChartDataSet:object;
  /*시간별*/
  public timeChartDataSet:object;
  /*콘텐츠*/
  public contentsChartDataSet:object;
  /*콘텐츠*/
  public categoryChartDataSet:object;

  constructor(private activatedRoute: ActivatedRoute,
              private cmsApi: CmsApis,
              private dashboardService: DashboardService) { }

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
    this.chartOptions3 = {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          ticks: {
            display: false,
          },
        }],
      },
    };
    this.loadDateChart();
    this.loadTimeChart();
    this.loadContentsChart();
    this.loadCategoryChart();
  }

  loadDateChart() {
    this.dashboardService.getLists(this.cmsApi.dateDashboard)
      .toPromise()
      .then((cont:object) => {
        const list = JSON.parse(cont['_body']);
        const tempLabel:any[] = list['label'].map((item) => {
          const temp = new Date(item);
          return ((temp.getMonth() + 1) < 10 ? '0' + (temp.getMonth() + 1) : (temp.getMonth() + 1)) + '/' + ((temp.getDate() < 10 ? '0' + temp.getDate() : temp.getDate()));
        });
        tempLabel.reverse();
        list['data'].reverse();

        this.dateChartDataSet = {
          labels: tempLabel,
          datasets: [
            {
              label: '재생 수',
              data: list['data'],
              fill: false,
              borderColor: '#ffcdd2',
            }],
        };
      });
  }

  loadTimeChart() {
    this.dashboardService.getLists(this.cmsApi.timeDashboard)
      .toPromise()
      .then((cont:object) => {
        const list = JSON.parse(cont['_body']);
        const tempLabel:any[] = list['label'].map((item) => {
          return item + '시';
        });
        this.timeChartDataSet = {
          labels: tempLabel,
          datasets: [
            {
              label: '재생 수',
              data: list['data'],
              backgroundColor: this.backgroundColors,
            }],
        };
      });
  }

  loadContentsChart() {
    this.dashboardService.getLists(this.cmsApi.contentsDashboard)
      .toPromise()
      .then((cont:object) => {
        const list = JSON.parse(cont['_body']);

        this.contentsChartDataSet = {
          labels: list['label'],
          datasets: [
            {
              label: '재생 수',
              data: list['data'],
              backgroundColor: this.backgroundColors,
            }],
        };
      });
  }

  loadCategoryChart() {
    this.dashboardService.getLists(this.cmsApi.categoryDashboard)
      .toPromise()
      .then((cont:object) => {
        const list = JSON.parse(cont['_body']);

        this.categoryChartDataSet = {
          labels: list['label'],
          datasets: [
            {
              label: '재생 수',
              data: list['data'],
              fill: false,
              backgroundColor: this.backgroundColors,
            }],
        };
      });
  }
}
