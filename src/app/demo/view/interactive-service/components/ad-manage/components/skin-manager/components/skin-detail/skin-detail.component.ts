/**
 * Created by GRE511 on 2019-01-18.
 */
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { BreadcrumbService } from '../../../../../../../../../breadcrumb.service';

@Component({
  selector: 'skin-detail',
  styleUrls: ['../../../../../interactive-service.component.css'],
  templateUrl: './skin-detail.component.html'})

export class SkinDetailComponent implements OnInit {
  public skinDetailForm:FormGroup;
  public skinNameLength:string = '';
  public yearRange: string = `${new Date().getFullYear() - 3}:${new Date().getFullYear()}`;
  public localeObject: object = {
    firstDayOfWeek: 0,
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    today: 'Today',
    clear: 'Clear',
  };

  constructor(private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-chat/list'] },
      { label: '실시간 광고 전송', routerLink: ['/interactive-service/ad-manage/manager/manager-list'] },
      { label: '스킨관리', routerLink: ['/interactive-service/ad-manage/skin-manager/skin-list'] },
    ]);
  }

  ngOnInit() {
    this.skinDetailForm = this.formBuilder.group({
      skinName: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(15)])),
      thumbnail: new FormControl(null),
      skinUse: new FormControl(true),
      skinPeriod: new FormControl('realtime'),
      skinPeriodDates: new FormControl({ value: [new Date, new Date], disabled: true }),
      periodContinue: new FormControl({ value: false, disabled: true }),
      skinPoint: new FormControl('realtime'),
      skinPoint_realTime_minutes: new FormControl({ value: 30, disabled: false }),
      skinPoint_realTime_continue: new FormControl({ value: false, disabled: false }),
      skinPoint_user_start: new FormControl({ value: 0, disabled: true }),
      skinPoint_user_end: new FormControl({ value: 0, disabled: true }),
      skinPoint_user_continue: new FormControl({ value: false, disabled: true }),
    });
  }

  onSubmit(value: any) {
    console.log(value);
  }

  skinPeriodSetting() {
    this.skinDetailForm.get('skinPeriod').value === 'realtime' ? this.skinDetailForm.get('skinPeriodDates').disable() : this.skinDetailForm.get('skinPeriodDates').enable();
    this.skinDetailForm.get('skinPeriod').value === 'realtime' ? this.skinDetailForm.get('periodContinue').disable() : this.skinDetailForm.get('periodContinue').enable();
  }

  skinPointSetting() {
    this.skinDetailForm.get('skinPoint').value !== 'realtime' ? this.skinDetailForm.get('skinPoint_realTime_minutes').disable() : this.skinDetailForm.get('skinPoint_realTime_minutes').enable();
    this.skinDetailForm.get('skinPoint').value !== 'realtime' ? this.skinDetailForm.get('skinPoint_realTime_continue').disable() : this.skinDetailForm.get('skinPoint_realTime_continue').enable();
    this.skinDetailForm.get('skinPoint').value === 'realtime' ? this.skinDetailForm.get('skinPoint_user_start').disable() : this.skinDetailForm.get('skinPoint_user_start').enable();
    this.skinDetailForm.get('skinPoint').value === 'realtime' ? this.skinDetailForm.get('skinPoint_user_end').disable() : this.skinDetailForm.get('skinPoint_user_end').enable();
    this.skinDetailForm.get('skinPoint').value === 'realtime' ? this.skinDetailForm.get('skinPoint_user_continue').disable() : this.skinDetailForm.get('skinPoint_user_continue').enable();
  }
}
