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
  public maxDateValue:Date = new Date();
  public pathName:string = '날짜별';
  public pathArray:object = {
    date: '날짜별',
    time: '시간별',
    'play-section': '재생 구간',
    'play-time': '재생 시간',
    contents: '콘텐츠 통계',
    category: '카테고리 통계'};
  public selectDuration:object = { };

  public isMultiSelectDuration:boolean = false;
  public durationCount:any[] = [0];
  public multiSelectDuration:any[] = [
    { selectDuration: new Date() },
  ];
  public invalidDates:any[] = [[]];
  public yearRange: string = `${new Date().getFullYear() - 3}:${new Date().getFullYear()}`;
  public localeObject: object = {
    firstDayOfWeek: 0,
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    today: 'Today',
    clear: 'Clear',
  };

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
    const start = tempDate.getDate() - 6;
    const end = tempDate.getDate() ;
    if (this.pathName !== '재생 구간' && this.pathName !== '재생 시간') {
      this.updateChoiceDuration({
        range : 'l-7days',
        date: [this.datePipe.transform(new Date().setDate(start), 'yyyy-MM-dd'), this.datePipe.transform(new Date().setDate(end), 'yyyy-MM-dd')],
      });
    } else {
      this.updateChoiceDuration({
        range : 't',
        date: [this.datePipe.transform(new Date().setDate(end), 'yyyy-MM-dd'), this.datePipe.transform(new Date().setDate(end), 'yyyy-MM-dd')],
      });
    }
  }

  refresh() {
    window.location.reload();
  }

  updateChoiceDuration(e) {
    this.selectDuration = e;
  }

  useMultiMode() {
    this.invalidDates = [];
    if (!this.isMultiSelectDuration) {
      this.durationCount = [0];
      this.multiSelectDuration = [{
        selectDuration: this.multiSelectDuration[0]['selectDuration'],
      }];
    } else {
      this.durationCount = [0, 1];
      this.multiSelectDuration.push({
        selectDuration: '',
      });
      this.invalidDates.push([]);
      this.invalidDates.push([this.multiSelectDuration[0].selectDuration]);
    }
  }

  updateMultiSelectDuration() {
    this.multiSelectDuration = [...this.multiSelectDuration];
    this.invalidDates = [];

    if (this.durationCount.length === 2) {
      this.multiSelectDuration[1].selectDuration ? this.invalidDates.push([this.multiSelectDuration[1].selectDuration]) : this.invalidDates.push([null]);
      this.invalidDates.push([this.multiSelectDuration[0].selectDuration]);
    } else if (this.durationCount.length === 3) {
      this.invalidDates.push([]);
      this.invalidDates.push([this.multiSelectDuration[0].selectDuration]);
      this.invalidDates.push([this.multiSelectDuration[0].selectDuration]);
      if (this.multiSelectDuration[1].selectDuration) {
        if (this.multiSelectDuration[2].selectDuration) {
          this.invalidDates[0] = [this.multiSelectDuration[1].selectDuration, this.multiSelectDuration[2].selectDuration];
          this.invalidDates[1] = [this.multiSelectDuration[0].selectDuration, this.multiSelectDuration[2].selectDuration];
          this.invalidDates[2] = [this.multiSelectDuration[0].selectDuration, this.multiSelectDuration[1].selectDuration];
        } else {
          this.invalidDates[0] = [this.multiSelectDuration[1].selectDuration];
          this.invalidDates[1] = [this.multiSelectDuration[0].selectDuration];
          this.invalidDates[2] = [this.multiSelectDuration[0].selectDuration, this.multiSelectDuration[1].selectDuration];
        }
      } else if (this.multiSelectDuration[2].selectDuration && !this.multiSelectDuration[1].selectDuration) {
        this.invalidDates[0] = [this.multiSelectDuration[2].selectDuration];
        this.invalidDates[1] = [this.multiSelectDuration[0].selectDuration, this.multiSelectDuration[2].selectDuration];
        this.invalidDates[2] = [this.multiSelectDuration[0].selectDuration];
      }
    }
  }

  upDurationCount() {
    if (this.durationCount.length < 3) {
      this.durationCount.push(this.durationCount.length);
      this.multiSelectDuration.push({
        selectDuration: '',
      });
    }
    this.updateMultiSelectDuration();
  }

  downDurationCount(e) {
    this.durationCount.pop();
    this.multiSelectDuration.splice(e, 1);
    this.multiSelectDuration.forEach((item) => {
      if (item.selectDuration === '') {
        item.selectDuration = new Date();
      }
    });
    this.updateMultiSelectDuration();
  }
}
