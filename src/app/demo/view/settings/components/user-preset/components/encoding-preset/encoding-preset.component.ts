/**
 * Created by GRE511 on 2019-01-25.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'encoding-preset',
  styleUrls: ['./encoding-preset.component.css'],
  templateUrl: './encoding-preset.component.html'})

export class EncodingPresetComponent implements OnInit {
  public params:Params;

  constructor(private breadcrumbService: BreadcrumbService, private activatedRoute: ActivatedRoute) {
    this.breadcrumbService.setItems([
      { label: '설정', routerLink: ['/settings/account/info'] },
      { label: '프리셋 설정', routerLink: ['/settings/user-preset/player'] },
      { label: '인코딩 프리셋', routerLink: ['/settings/user-preset/encoding'] },
    ]);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });
  }
}
