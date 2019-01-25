/**
 * Created by GRE511 on 2019-01-25.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';

@Component({
  selector: 'logo-wartermark-preset',
  styleUrls: ['./logo-wartermark-preset.component.css'],
  templateUrl: './logo-wartermark-preset.component.html'})

export class LogoWartermarkComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '설정', routerLink: ['/settings/account/info'] },
      { label: '프리셋 설정', routerLink: ['/settings/user-preset/player'] },
      { label: '로고/워터마크 설정', routerLink: ['/settings/user-preset/logo-wartermark'] },
    ]);
  }

  ngOnInit() {
  }
}
