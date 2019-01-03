import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardDemoComponent implements OnInit {
  public lineData:any;
  public barData:any;
  public pieData:any;
  public rangeDates:Date[] = [new Date(), new Date()];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '대시보드', routerLink: [''] }
    ]);
  }

  ngOnInit() {
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
}

