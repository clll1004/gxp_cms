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
  public skinAddForm:FormGroup;
  public skinNameLength:string = '';

  constructor(private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-chat/list'] },
      { label: '실시간 광고 전송', routerLink: ['/interactive-service/ad-manage/manager/manager-list'] },
      { label: '스킨관리', routerLink: ['/interactive-service/ad-manage/skin-manager/skin-list'] },
    ]);
  }

  ngOnInit() {
    this.skinAddForm = this.formBuilder.group({
      skinName: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(15)])),
      thumbnail: new FormControl(null),
    });
  }

  onSubmit(value: any) {
    console.log(value);
  }
}
