/**
 * Created by GRE511 on 2019-01-25.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'developer-tool',
  templateUrl: './developer-tool.component.html'})

export class DeveloperToolComponent implements OnInit {
  public params:Params;
  public tabMenuItems: MenuItem[];

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });

    this.tabMenuItems = [
      { label: '인코딩', routerLink: ['/developer-tool/encoding'] },
      { label: '플레이어', routerLink: ['/developer-tool/player'] },
      { label: '분석', routerLink: ['/developer-tool/analysis'] },
    ];
  }
}
