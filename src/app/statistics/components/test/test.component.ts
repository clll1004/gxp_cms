
/**
 * Created by GRE511 on 2018-10-17.
 */
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'test',
  templateUrl: 'test.component.html',
  styleUrls: ['test.component.css'],
  providers: [DatePipe]})

export class TestComponent implements OnInit {
  public reportForm: FormGroup;
  public autoReportForm: FormGroup;
  public submitted: boolean = false;
  public isLoading: boolean = false;

  public maxDateValue:Date = new Date();
  public yearRange: string = `${new Date().getFullYear() - 3}:${new Date().getFullYear()}`;
  public  localeObject: object = {
    firstDayOfWeek: 0,
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  };
  public durationYearlyOptions:any[] = [{ label: '2017 년', value: '2017' }, { label: '2018 년', value: '2018' }];
  public cycleOptions:any[] = [{ label: '매일', value: 'everyDay' }, { label: '매월', value: 'everyMonth' }];

  public emailLists:any[] = [];
  public emailDialog:boolean = false;
  public addEmail:string = '';
  public isAddFavorite:boolean = false;
  public addEmailLists:any[] = [];
  public favoritesEmailList:any[] = [];

  public isSelectReportType:boolean = false;
  public isSelectReportItem:boolean = false;
  public isEmptyEmailLists:boolean = false;

  public reportDurationIndex:number = 0;
  public reportDurationDaily:Date = new Date();
  public reportDurationWeekly:Date[] = [new Date(), new Date()];
  public reportDurationMonthly:Date = new Date();
  public reportDurationYearly:string = '2018';

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit() {
    this.reportForm = this.formBuilder.group({
      reportDuration: new FormControl(null),
      selectTraffic: new FormControl(false),
      selectTransCoding: new FormControl(false),
      selectStorage: new FormControl(false),
      selectDate: new FormControl(false),
      selectGXP: new FormControl(false),
      selectTime: new FormControl(false),
      selectPlaySection: new FormControl(false),
      selectPlayTime: new FormControl(false),
      selectContents: new FormControl(false),
      selectCategory: new FormControl(false),
    });
    this.autoReportForm = this.formBuilder.group({
      autoReportUse: new FormControl('Y'),
      autoPeriod: new FormControl('continue'),
      autoPeriodDates: new FormControl({ value: [new Date, new Date], disabled: true }),
      autoCycle: new FormControl('everyDay'),
      reportTypeDaily: new FormControl(false),
      reportTypeWeekly: new FormControl(false),
      reportTypeMonthly: new FormControl(false),
      reportTypeYearly: new FormControl(false),
      selectTraffic: new FormControl(false),
      selectTransCoding: new FormControl(false),
      selectStorage: new FormControl(false),
      selectDate: new FormControl(false),
      selectGXP: new FormControl(false),
      selectTime: new FormControl(false),
      selectPlaySection: new FormControl(false),
      selectPlayTime: new FormControl(false),
      selectContents: new FormControl(false),
      selectCategory: new FormControl(false),
      sendEmailList: new FormControl(null),
    });
  }

  refresh() {
    window.location.reload();
  }

  reportDurationChange(e) {
    const target = e.currentTarget;
    if (target.getAttribute('class') !== 'on') {
      const tab = document.getElementById('reportTab').children;
      [].forEach.call(tab, (item) => {
        item.setAttribute('class', '');
      });
      target.setAttribute('class', 'on');
    }
    this.reportDurationIndex = target.tabIndex;
  }

  downloadReportToLocal(value:any) {
    if (!value.selectTraffic && !value.selectTransCoding && !value.selectStorage && !value.selectDate && !value.selectGXP && !value.selectTime && !value.selectPlaySection && !value.selectPlayTime && !value.selectContents && !value.selectCategory) {
      this.isSelectReportItem = true;
      return false;
    }
    const newValue = this.setReportDuration(value);
    console.log(newValue);
  }

  sendReportToMail(value:any) {
    if (!value.selectTraffic && !value.selectTransCoding && !value.selectStorage && !value.selectDate && !value.selectGXP && !value.selectTime && !value.selectPlaySection && !value.selectPlayTime && !value.selectContents && !value.selectCategory) {
      this.isSelectReportItem = true;
      return false;
    }
    const newValue = this.setReportDuration(value);
    console.log(newValue);
  }

  setReportDuration(object) {
    let durationArray:any[] = [];
    switch (this.reportDurationIndex) {
      case 0:
        // 일일리포트
        durationArray = [this.datePipe.transform(this.reportDurationDaily, 'yyyy-MM-dd'), this.datePipe.transform(this.reportDurationDaily, 'yyyy-MM-dd')];
        object.reportDuration = durationArray;
        break;
      case 1:
        // 주간리포트
        durationArray = this.reportDurationWeekly.map((item) => {
          return this.datePipe.transform(item, 'yyyy-MM-dd');
        });
        object.reportDuration = durationArray;
        break;
      case 2:
        // 월간리포트
        const tempDate = new Date(this.datePipe.transform(this.reportDurationMonthly, 'yyyy-MM'));
        durationArray.push(this.datePipe.transform(new Date(tempDate.getFullYear(), tempDate.getMonth(), 1), 'yyyy-MM-dd'));
        durationArray.push(this.datePipe.transform(new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 0), 'yyyy-MM-dd'));
        object.reportDuration = durationArray;
        break;
      case 3:
        // 연간리포트
        durationArray.push(this.datePipe.transform(new Date(Number(this.reportDurationYearly), 0, 1), 'yyyy-MM-dd'));
        durationArray.push(this.datePipe.transform(new Date(Number(this.reportDurationYearly), 11, 31), 'yyyy-MM-dd'));
        object.reportDuration = durationArray;
        break;
      default:
        break;
    }
    return object;
  }

  includeEmailList(list:any[], binary:boolean = true) {
    if (binary) {
      if (list.indexOf(this.addEmail) === -1) {
        list.push(this.addEmail);
      }
    } else {
      const idx = list.indexOf(this.addEmail);
      this.excludeEmailList(list, idx);
    }
  }

  excludeEmailList(list:any[], index:number) {
    if (list === this.favoritesEmailList && list[index] === this.addEmail) {
      this.isAddFavorite = false;
    }
    list.splice(index, 1);
  }

  isFavorite() {
    this.isAddFavorite = this.favoritesEmailList.indexOf(this.addEmail) !== -1;
  }

  emptyAddEmailList() {
    this.addEmail = '';
    this.isAddFavorite = false;
    this.addEmailLists = [];
  }

  addToEmailList() {
    this.addEmail = '';
    this.isAddFavorite = false;
    this.emailLists = this.emailLists.concat(this.addEmailLists);
    this.addEmailLists = [];
  }

  autoReportSubmit(value:any) {
    if (!value.reportTypeDaily && !value.reportTypeWeekly && !value.reportTypeMonthly && !value.reportTypeYearly) {
      this.isSelectReportType = true;
      return false;
    }
    if (!value.selectTraffic && !value.selectTransCoding && !value.selectStorage && !value.selectDate && !value.selectGXP && !value.selectTime && !value.selectPlaySection && !value.selectPlayTime && !value.selectContents && !value.selectCategory) {
      this.isSelectReportItem = true;
      return false;
    }
    if (!this.emailLists[0]) {
      this.isEmptyEmailLists = true;
      return false;
    }

    this.submitted = true;
    if (value.autoPeriod === 'setting') {
      value.autoPeriodDates[0] = this.datePipe.transform(value.autoPeriodDates[0], 'yyyy-MM-dd');
      value.autoPeriodDates[1] = this.datePipe.transform(value.autoPeriodDates[1], 'yyyy-MM-dd');
    }
    value.sendEmailList = this.emailLists;
    console.log(value);
  }

  autoPeriodSetting() {
    this.autoReportForm.get('autoPeriod').value === 'setting' ? this.autoReportForm.get('autoPeriodDates').enable() : this.autoReportForm.get('autoPeriodDates').disable();
  }
}

// const today = new Date();
// durationArray[1] = new Date(durationArray[1]).getTime() > today.getTime() ? this.datePipe.transform(today, 'yyyy-MM-dd') : durationArray[1];
