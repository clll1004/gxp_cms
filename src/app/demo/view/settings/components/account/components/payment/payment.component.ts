/**
 * Created by GRE511 on 2019-01-25.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';

@Component({
  selector: 'payment',
  styleUrls: ['./payment.component.css'],
  templateUrl: './payment.component.html'})

export class PaymentComponent implements OnInit {
  public statementLists:any[] = [
    { payDate: '2018-03-06 04:47:44', payCost: '500,000 원' },
    { payDate: '2018-03-06 04:47:44', payCost: '500,000 원' },
  ];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '설정', routerLink: ['/settings/account/info'] },
      { label: '계정설정', routerLink: ['/settings/account/info'] },
      { label: '결제관리', routerLink: ['/settings/account/payment'] },
    ]);
  }

  ngOnInit() {
  }
}
