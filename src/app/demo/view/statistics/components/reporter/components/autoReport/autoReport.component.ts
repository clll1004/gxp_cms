/**
 * Created by GRE511 on 2019-01-07.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'autoReport',
  styleUrls: ['../../../statistics.component.css'],
  templateUrl: './autoReport.component.html'})

export class AutoReportComponent implements OnInit {
  public autoReportForm: FormGroup;
  public cycleOptions:any[] = [{ label: '전체', value: 'all' }, { label: '1주마다', value: 'forAWeek' }, { label: '2주마다', value: 'forTwoWeeks' }, { label: '한달마다', value: 'forMonth' }];
  public yearRange: string = `${new Date().getFullYear() - 3}:${new Date().getFullYear()}`;
  public localeObject: object = {
    firstDayOfWeek: 0,
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    today: 'Today',
    clear: 'Clear',
  };
  public emailLists:any[] = [];
  public emailDialog:boolean = false;
  public addEmail:string = '';
  public addEmailLists:any[] = [];

  constructor(private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder) {
    this.breadcrumbService.setItems([
      { label: '통계', routerLink: ['/statistics/play-statistics/byDate'] },
      { label: '리포트', routerLink: ['/statistics/reporter/exportReport'] },
      { label: '자동리포트 설정', routerLink: ['/statistics/reporter/autoReport'] },
    ]);
  }

  ngOnInit() {
    this.autoReportForm = this.formBuilder.group({
      autoReportUse: new FormControl(false),
      autoPeriod: new FormControl('continue'),
      autoPeriodDates: new FormControl({ value: [new Date, new Date], disabled: true }),
      autoCycle: new FormControl('all'),
      selectDate: new FormControl(false),
      selectTime: new FormControl(false),
    });
  }

  autoPeriodSetting() {
    this.autoReportForm.get('autoPeriod').value === 'continue' ? this.autoReportForm.get('autoPeriodDates').disable() : this.autoReportForm.get('autoPeriodDates').enable();
  }

  includeEmailList(list:any[]) {
    if (list.indexOf(this.addEmail) === -1) {
      list.push(this.addEmail);
    }
  }

  excludeEmailList(list:any[], index:number) {
    list.splice(index, 1);
  }

  emptyAddEmailList() {
    this.addEmail = '';
    this.addEmailLists = [];
  }

  addToEmailList() {
    this.addEmail = '';
    this.emailLists = this.emailLists.concat(this.addEmailLists);
    this.addEmailLists = [];
  }
}
