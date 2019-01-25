/**
 * Created by GRE511 on 2019-01-25.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';

@Component({
  selector: 'service-manage',
  styleUrls: ['./service-manage.component.css'],
  templateUrl: './service-manage.component.html'})

export class ServiceManageComponent implements OnInit {

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '설정', routerLink: ['/settings/account/info'] },
      { label: '계정설정', routerLink: ['/settings/account/info'] },
      { label: '계정정보', routerLink: ['/settings/account/info'] },
    ]);
  }

  ngOnInit() {
  }
}
