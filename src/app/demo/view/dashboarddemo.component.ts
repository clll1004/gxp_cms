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
          fill: false,
          borderColor: '#ff5f00'
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#f37931'
        }
      ]
    };

    this.barData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#ff5f00',
          borderColor: '#ff5f00',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#ffcbba',
          borderColor: '#ffcbba',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    this.pieData = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            '#ff5f00',
            '#ffcbba',
            '#f37931'
          ]
        }]
    };
  };
}

