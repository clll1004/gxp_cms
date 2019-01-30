/**
 * Created by GRE511 on 2019-01-30.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../breadcrumb.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'support-detail',
  styleUrls: ['../sAdmin.component.css'],
  templateUrl: './support-detail.component.html'})

export class SupportDetailComponent implements OnInit {
  public supportForm:FormGroup;
  public completeDialog:boolean = false;

  constructor(private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder) {
    this.breadcrumbService.setItems([
      { label: '고객지원', routerLink: ['/admin/support-manager'] },
      { label: '상세', routerLink: ['/admin/support-detail'] },
    ]);
  }

  ngOnInit() {
    this.supportForm = this.formBuilder.group({
      title: new FormControl('문의합니다'),
      charge: new FormControl('김주영 (asdf@naver.com)'),
      createdAt: new FormControl('2018.07.25 15:20'),
      contents: new FormControl('스탠다드 서비스 견적 문의합니다. 02-555-5555'),
      file: new FormControl(null),
      reply: new FormControl(null),
      replyAt: new FormControl('2018.07.25 15:20'),
    });
  }

  closePopup() {
    this.completeDialog = false;
  }

  onSubmit(value) {
    console.log(value.duration);
    this.completeDialog = true;
  }
}
