/**
 * Created by GRE511 on 2018-09-07.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'usage-analysis',
  templateUrl: './usage-analysis.component.html',
  styleUrls: ['./usage-analysis.component.css'],
  providers: [DatePipe]})

export class UsageAnalysisComponent implements OnInit {
  public pathName:string = '날짜별';
  public pathArray:object = {
    traffic: '트래픽',
    storage: '스토리지',
    'gxp-usage': 'GXP 사용량',
    'trans-coding': '트랜스코딩',
  };
  public selectDuration:object = { };

  constructor(private activatedRoute: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe((urlItem) => {
      this.pathName = this.pathArray[urlItem[2].path];
      this.dateInit();
    });
  }

  dateInit() {
    this.selectDuration = {};
    const tempDate = new Date();
    const start = tempDate.getDate() - 7;
    const yesterday = tempDate.getDate() - 1;
    this.updateChoiceDuration({
      range : 'l-7days',
      date: [this.datePipe.transform(new Date().setDate(start), 'yyyy-MM-dd'), this.datePipe.transform(new Date().setDate(yesterday), 'yyyy-MM-dd')],
    });
  }

  updateChoiceDuration(e) {
    this.selectDuration = e;
  }
}
