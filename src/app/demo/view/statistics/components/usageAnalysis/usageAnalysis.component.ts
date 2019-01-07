/**
 * Created by GRE511 on 2019-01-03.
 */
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'usageAnalysis',
  templateUrl: './usageAnalysis.component.html'})

export class UsageAnalysisComponent implements OnInit {
  public tabMenuItems: MenuItem[];
  public params:Params;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });

    this.tabMenuItems = [
      { label: 'GXP 사용량', routerLink: ['/statistics/usage-analysis/byGXP'] },
      { label: '스토리지 사용량', routerLink: ['/statistics/usage-analysis/byStorage'] },
      { label: '인코딩', routerLink: ['/statistics/usage-analysis/byEncoding'] },
    ];
  }
}
