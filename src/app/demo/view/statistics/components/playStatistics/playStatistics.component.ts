/**
 * Created by GRE511 on 2019-01-03.
 */
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'playStatistics',
  templateUrl: './playStatistics.component.html'})

export class PlayStatisticsComponent implements OnInit {
  public tabMenuItems: MenuItem[];
  public params:Params;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });

    this.tabMenuItems = [
      { label: '날짜별 분석', routerLink: ['/statistics/play-statistics/byDate'] },
      { label: '시간별 분석', routerLink: ['/statistics/play-statistics/byTime'] },
      { label: '재생구간', routerLink: ['/statistics/play-statistics/byPlaySection'] },
      { label: '재생시간', routerLink: ['/statistics/play-statistics/byPlayTime'] },
      { label: '콘텐츠 통계', routerLink: ['/statistics/play-statistics/byContents'] },
      { label: '재생목록 통계', routerLink: ['/statistics/play-statistics/byPlayList'] },
      { label: '광고 통계', routerLink: ['/statistics/play-statistics/byAd'] },
    ];
  }
}
