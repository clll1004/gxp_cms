/**
 * Created by GRE511 on 2019-01-25.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../breadcrumb.service';

@Component({
  selector: 'encoding-tool',
  templateUrl: './encoding-tool.component.html'})

export class EncodingToolComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '개발자도구', routerLink: ['/developer-tool/encoding'] },
      { label: '인코딩', routerLink: ['/developer-tool/encoding'] },
    ]);
  }

  ngOnInit() {
  }
}
