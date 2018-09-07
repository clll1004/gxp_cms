/**
 * Created by GRE511 on 2018-09-07.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'usage-analysis',
  templateUrl: './usage-analysis.component.html',
  styleUrls: ['./usage-analysis.component.css']})

export class UsageAnalysisComponent implements OnInit {
  public pathName:string = '날짜별';
  public pathArray:object = {
    traffic: '트래픽',
    storage: '스토리지',
    'gxp-usage': 'GXP 사용량',
    'trans-coding': '트랜스코딩',
  };
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe((urlItem) => {
      this.pathName = this.pathArray[urlItem[2].path];
    });
  }
}
