/**
 * Created by GRE511 on 2019-01-03.
 */
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'reporter',
  templateUrl: './reporter.component.html'})

export class ReporterComponent implements OnInit {
  public tabMenuItems: MenuItem[];
  public params:Params;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });

    this.tabMenuItems = [
      { label: '리포트 발송', routerLink: ['/statistics/reporter/exportReport'] },
      { label: '자동리포트 설정', routerLink: ['/statistics/reporter/autoReport'] },
    ];
  }
}
