/**
 * Created by GRE511 on 2019-01-30.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../breadcrumb.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'license-detail',
  styleUrls: ['../sAdmin.component.css'],
  templateUrl: './license-detail.component.html'})

export class LicenseDetailComponent implements OnInit {
  public licenseForm:FormGroup;
  public completeDialog:boolean = false;

  constructor(private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder) {
    this.breadcrumbService.setItems([
      { label: '인증키관리', routerLink: ['/admin/license-manager'] },
      { label: '상세', routerLink: ['/admin/license-detail'] },
    ]);
  }

  ngOnInit() {
    this.licenseForm = this.formBuilder.group({
      clientName: new FormControl('곰&컴퍼니'),
      domain: new FormControl('gomgxp.com'),
      usingService: new FormControl('스탠다드'),
      licenseKey: new FormControl('ALDFKASLFDSAKFSADFL'),
      duration: new FormControl([new Date(), new Date()]),
      sdate: new FormControl('2018.07.25 15:20'),
      edate: new FormControl('2018.07.25 15:20'),
      updateAt: new FormControl('2018.07.25 15:20'),
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
