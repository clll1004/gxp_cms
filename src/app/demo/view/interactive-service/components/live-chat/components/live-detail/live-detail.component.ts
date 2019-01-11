/**
 * Created by GRE511 on 2019-01-10.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'live-detail',
  styleUrls: ['../../../interactive-service.component.css'],
  templateUrl: './live-detail.component.html'})

export class LiveDetailComponent implements OnInit {
  public sendFileForm:FormGroup;

  public userCols:any[] = [
    { header: '회원ID', field: 'userId' },
    { header: '회원명', field: 'userName' },
    { header: '채팅접속일시', field: 'accessTime' },
  ];
  public userRowData:any[] = [
    { userId: 'asdf1', userName: '김민', accessTime: '2018-10-22 15:00' },
    { userId: 'asdf2', userName: '이민', accessTime: '2018-10-22 15:00' },
    { userId: 'asdf3', userName: '박민', accessTime: '2018-10-22 15:00' },
    { userId: 'asdf4', userName: '정민', accessTime: '2018-10-22 15:00' },
    { userId: 'asdf5', userName: '태민', accessTime: '2018-10-22 15:00' },
    { userId: 'asdf6', userName: '호민', accessTime: '2018-10-22 15:00' },
  ];

  public searchDialog:boolean = false;
  public selectedUser:any[] = [];

  constructor(private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-chat/list'] },
      { label: '라이브채팅', routerLink: ['/interactive-service/live-chat/list'] },
      { label: '상세', routerLink: ['/interactive-service/live-chat/detail'] },
    ]);
  }

  ngOnInit() {
    this.sendFileForm = this.formBuilder.group({
      target: new FormControl('all'),
      appointTarget: new FormControl({ value: null, disabled: true }),
      url: new FormControl(null),
      file: new FormControl(null),
    });
  }

  onSubmit(value:any) {
    console.log(value);
  }

  autoPeriodSetting() {
    this.sendFileForm.get('target').value === 'all' ? this.sendFileForm.get('appointTarget').disable() : this.sendFileForm.get('appointTarget').enable();
  }

  closePopup() {
    this.searchDialog = false;
  }

  appendTarget() {
    this.sendFileForm.get('appointTarget').setValue(null);
    const length = this.selectedUser.length;
    for (let i = 0 ; i < length ; i += 1) {
      if (this.sendFileForm.get('appointTarget').value === null) {
        this.sendFileForm.get('appointTarget').setValue(this.selectedUser[i].userName);
      } else {
        this.sendFileForm.get('appointTarget').setValue(this.sendFileForm.get('appointTarget').value + ',' + this.selectedUser[i].userName);
      }
    }
  }
}

