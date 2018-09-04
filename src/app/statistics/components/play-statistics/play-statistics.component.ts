/**
 * Created by GRE511 on 2018-08-21.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'play-statistics',
  templateUrl: 'play-statistics.component.html',
  styleUrls: ['./play-statistics.component.css'],
  providers: [DatePipe]})

export class PlayStatisticsComponent implements OnInit {
  public pathName:string = '날짜별';
  public pathArray:object = {
    date: '날짜별',
    time: '시간별',
    'play-section': '재생 구간',
    'play-time': '재생 시간',
    contents: '콘텐츠 통계',
    category: '카테고리 통계'};
  public selectDuration:object = { };
  public selectFolder:object = { label:'전체 폴더', value: 0 };
  public searchKey:string = '';

  public isMultiSelectDuration:boolean = false;
  public durationCount:any[] = [0];
  public multiSelectDuration:any[] = [
    { selectDuration: new Date() },
  ];
  public yearRange: string = `${new Date().getFullYear() - 3}:${new Date().getFullYear()}`;

  constructor(private activatedRoute: ActivatedRoute, private datePipe: DatePipe) {}

  ngOnInit() {
    this.activatedRoute.url.subscribe((urlItem) => {
      this.pathName = this.pathArray[urlItem[2].path];
      this.dateInit();
      this.isMultiSelectDuration = false;
      this.durationCount = [0];
      this.multiSelectDuration = [
        { selectDuration: new Date() },
      ];
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

  updateMultiSelectDuration() {
    this.multiSelectDuration = [...this.multiSelectDuration];
  }

  updateChoiceFolder(e) {
    this.selectFolder = e;
  }

  upDurationCount() {
    if (this.durationCount.length < 3) {
      this.durationCount.push(this.durationCount.length);
      this.multiSelectDuration.push({
        selectDuration: new Date(),
      });
    }
    this.updateMultiSelectDuration();
  }

  downDurationCount(e) {
    this.durationCount.pop();
    this.multiSelectDuration.splice(e, 1);
    this.updateMultiSelectDuration();
  }
}
