import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { DashboardService } from '../service/dashboard.service';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardDemoComponent implements OnInit {
  public lineData:any;
  public barData:any;
  public pieData:any;

  public today = new Date();
  public rangeDates:Date[] = [new Date(), new Date()];
  public transeDate:any[] = [];

  public chartOptions:object;
  public chartOptions2:object;
  public chartOptions3:object;

  /*GXP사용량*/
  public gxpDataSet:object;
  /*스토리지*/
  public storageDataSet:object;
  /*시간별*/
  public timeDataSet:object;
  /*콘텐츠*/
  public contentsDataSet:object;
  /*카테고리*/
  public categoryDataSet:object;
  /*트래픽*/
  public trafficDataSet:object;

  constructor(private breadcrumbService: BreadcrumbService, private dashboardService: DashboardService) {
    this.breadcrumbService.setItems([
      { label: '대시보드', routerLink: [''] }
    ]);
  }

  ngOnInit() {
    this.rangeDates[0].setDate(this.today.getDate() - 7);
    this.rangeDates[1].setDate(this.today.getDate() - 1);
    this.tranceDateType();

    this.loadGXPUsage();
    this.loadStorageUsage();
    this.loadTimePlayCount();
    this.loadContentsPlayCount();
    this.loadCategoryPlayCount();
    this.loadTraffic();

    this.chartOptions = {
      legend: {
        position: 'top',
      },
    };
    this.chartOptions2 = {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          maxBarThickness: 100,
        }],
        yAxes: [{
          ticks: {
            beginAtZero:true,
            userCallback: (label) => {
              if (Math.floor(label) === label) {
                return label;
              }
            },
          },
        }],
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
        yAxes: [{
          ticks: {
            beginAtZero:true,
            userCallback: (label) => {
              if (Math.floor(label) === label) {
                return label;
              }
            },
          },
        }],
      },
    };

    this.lineData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          backgroundColor: 'rgba(248,121,16,.2)',
          borderColor: '#f87910'
        }
      ]
    };

    this.barData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(248,121,16,.6)',
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };

    this.pieData = {
      labels: ['A', 'B'],
      datasets: [
        {
          data: [90, 10],
          backgroundColor: [
            '#f87910',
            '#ddd',
          ]
        }]
    };
  };

  tranceDateType() {
    if (this.rangeDates[1] !== null) {
      this.transeDate[0] = this.rangeDates[0].getFullYear() + '-' + ((this.rangeDates[0].getMonth() + 1) < 10 ? '0' + (this.rangeDates[0].getMonth() + 1) : (this.rangeDates[0].getMonth() + 1)) + '-' + ((this.rangeDates[0].getDate() < 10 ? '0' + this.rangeDates[0].getDate() : this.rangeDates[0].getDate()));
      this.transeDate[1] = this.rangeDates[1].getFullYear() + '-' + ((this.rangeDates[1].getMonth() + 1) < 10 ? '0' + (this.rangeDates[1].getMonth() + 1) : (this.rangeDates[1].getMonth() + 1)) + '-' + ((this.rangeDates[1].getDate() < 10 ? '0' + this.rangeDates[1].getDate() : this.rangeDates[1].getDate()));

      this.loadGXPUsage();
      this.loadStorageUsage();
      this.loadTimePlayCount();
      this.loadContentsPlayCount();
      this.loadCategoryPlayCount();
    }
  }

  loadGXPUsage() {
    this.dashboardService.getGXPUsage()
      .then((list) => {
        this.gxpDataSet = {
          labels: list['label'],
          datasets: [{
            label: '사용량',
            data: list['data'],
            fill: true,
            backgroundColor: ['#f87910', '#ddd'],
          }],
        };
      });
  }

  loadStorageUsage() {
    this.dashboardService.getStorageUsage()
      .then((list) => {
        this.storageDataSet = {
          labels: list['label'],
          datasets: [{
            label: '사용량',
            data: list['data'],
            fill: true,
            backgroundColor: ['#f87910', '#ddd'],
          }],
        };
      });
  }

  loadTimePlayCount() {
    this.dashboardService.getTimePlayCount(this.transeDate)
      .then((list) => {
        const tempLabel:any[] = list['label'].map((item) => {
          return `${item}시`;
        });
        this.timeDataSet = {
          labels: tempLabel,
          datasets: [
            {
              label: '재생 수',
              data: list['data'],
              backgroundColor: 'rgba(248,121,16,.2)',
              borderColor: '#f87910',
            }],
        };
      });
  }

  loadContentsPlayCount() {
    this.dashboardService.getContentsPlayCount(this.transeDate)
      .then((list) => {
        this.contentsDataSet = {
          labels: list['label'],
          datasets: [
            {
              label: '재생 수',
              data: list['data'],
              backgroundColor: 'rgba(248,121,16,.6)',
            }],
        };
      });
  }

  loadCategoryPlayCount() {
    this.dashboardService.getCategoryPlayCount(this.transeDate)
      .then((list) => {
        this.categoryDataSet = {
          labels: list['label'],
          datasets: [
            {
              label: '재생 수',
              data: list['data'],
              backgroundColor: 'rgba(248,121,16,.6)',
            }],
        };
      });
  }

  loadTraffic() {
    this.dashboardService.getTraffic(this.transeDate)
      .then((list) => {
        const tempLabel:any[] = list['label'].map((item) => {
          const tempDate = new Date(item);
          return `${tempDate.getMonth() + 1}/${tempDate.getDate()}`;
        });
        this.trafficDataSet = {
          labels: tempLabel.reverse(),
          datasets: [
            {
              label: '트래픽',
              data: list['data'].reverse(),
              backgroundColor: 'rgba(248,121,16,.6)',
            }],
        };
      });
  }
}

