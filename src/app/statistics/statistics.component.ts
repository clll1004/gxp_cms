/**
 * Created by GRE511 on 2018-08-21.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html'})

export class StatisticsComponent implements OnInit {
  public params:Params;

  /*for path*/
  // public pagePath = {
  //   dashboard: '대시보드',
  //   'usage-analysis': '사용량 분석',
  //   'visitor-statistics': '방문자 통계',
  //   'play-statistics': '재생 통계'};
  // public pageName: string = '';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
      // this.pageName = this.pagePath[this.params.id];
    });
  }
}
