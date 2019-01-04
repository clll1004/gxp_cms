/**
 * Created by GRE511 on 2019-01-03.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'byTime',
  styleUrls: ['../../../statistics.component.css'],
  templateUrl: './byTime.component.html'})

export class ByTimeComponent implements OnInit {
  public isMultiSelectDuration:boolean = false;
  public invalidDates:any[] = [[]];
  public durationCount:any[] = [0];
  public multiSelectDuration:any[] = [
    { selectDuration: new Date() },
  ];
  public maxDateValue:Date = new Date();
  public yearRange: string = `${new Date().getFullYear() - 3}:${new Date().getFullYear()}`;
  public localeObject: object = {
    firstDayOfWeek: 0,
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    today: 'Today',
    clear: 'Clear',
  };

  public searchTypeOption:any = [{ label: '재생목록', value: 'playList' }, { label: '동영상', value: 'video' }];
  public searchSelectedType: any;

  public lineData:any;

  public typeOption:any = [{ label: '재생목록', value: 'playList' }, { label: '동영상', value: 'video' }];
  public selectedType: any = 'playList';

  public mediaOption:any = [{ label: '초등교육', value: 'opt0' }, { label: '중등교육', value: 'opt1' }];
  public selectedMedia: any = 'opt1';

  public durationLength:any[] = [];
  public timeTableTitle:any[] = [];
  public timeStatisticsCols:any[] = [
    { header: '시간', field: 'date' },
    { header: '요청된 콘텐츠 수', field: 'reqContentsCount' },
    { header: '전체 재생수', field: 'totalPlayCount' },
    { header: '유니크 재생수', field: 'uniquePlayCount' },
    { header: '시청시간', field: 'viewingTime' },
  ];
  public timeStatisticsLists:any[] = [
    [
      { date: 'a', reqContentsCount: 'a', totalPlayCount: 'a', uniquePlayCount: 'a', viewingTime: 'a' },
      { date: 'a', reqContentsCount: 'a', totalPlayCount: 'a', uniquePlayCount: 'a', viewingTime: 'a' },
      { date: 'a', reqContentsCount: 'a', totalPlayCount: 'a', uniquePlayCount: 'a', viewingTime: 'a' },
      { date: 'a', reqContentsCount: 'a', totalPlayCount: 'a', uniquePlayCount: 'a', viewingTime: 'a' },
      { date: 'a', reqContentsCount: 'a', totalPlayCount: 'a', uniquePlayCount: 'a', viewingTime: 'a' },
    ],
  ];

  constructor() {}

  ngOnInit() {
    this.isMultiSelectDuration = false;

    this.lineData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          backgroundColor: 'rgba(248,121,16,.2)',
          borderColor: '#f87910'
        }
      ]
    };

    this.durationLength = ['0'];
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

  foldingTable(btnId, tableId) {
    const btn = <HTMLElement>document.getElementById(btnId);
    const table = <HTMLElement>document.getElementById(tableId).children[0].children[0].children[0].children[2];
    const length = table.children.length;
    if (btn.innerHTML === '접기 &gt;') {
      for (let i = 0 ; i < length ; i += 1) {
        if (i > 2) {
          table.children[i]['style'].display = 'none';
        }
      }
      btn.innerText = '펼치기 >';
    } else {
      for (let i = 0 ; i < length ; i += 1) {
        if (i > 2) {
          table.children[i]['style'].display = 'table-row';
        }
      }
      btn.innerText = '접기 >';
    }
  }
}
