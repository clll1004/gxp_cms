/**
 * Created by GRE511 on 2019-01-16.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../../../breadcrumb.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'manager-detail',
  styleUrls: ['../../../../../interactive-service.component.css'],
  templateUrl: './manager-detail.component.html'})

export class ManagerDetailComponent implements OnInit {
  public adAddForm:FormGroup;
  public adNameLength:string = '';

  constructor(private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-chat/list'] },
      { label: '실시간 광고 전송', routerLink: ['/interactive-service/ad-manage/manager/manager-list'] },
    ]);
  }

  ngOnInit() {
    const today = new Date();
    const month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
    const date = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    const convertDate = `${today.getFullYear()}-${month}-${date} ${today.getHours()}:${today.getMinutes()}`;
    this.adAddForm = this.formBuilder.group({
      adName: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(15)])),
      thumbnail: new FormControl(null),
      regDate: new FormControl(convertDate),
      updateAt: new FormControl(convertDate),
    });
  }

  onSubmit(value: any) {
    console.log(value);
  }
}
