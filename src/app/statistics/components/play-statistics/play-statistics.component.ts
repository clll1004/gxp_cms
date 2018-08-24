/**
 * Created by GRE511 on 2018-08-21.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'play-statistics',
  templateUrl: 'play-statistics.component.html',
  styleUrls: ['./play-statistics.component.css']})

export class PlayStatisticsComponent implements OnInit {
  public pathName:string = '날짜별';
  public pathArray:object = {
    date: '날짜별',
    time: '시간별',
    'play-section': '재생 구간',
    'play-time': '재생 시간',
    contents: '콘텐츠 통계',
    category: '카테고리 통계'};

  public date:any = {
    range : 'l-7days'};
  public data:any;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.url.subscribe((urlItem) => {
      this.pathName = this.pathArray[urlItem[2].path];
    });
  }

  updateChoiceDuration(e) {
    this.data = e;
  }
}
