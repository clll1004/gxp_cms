/**
 * Created by GRE511 on 2019-01-28.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'contact-us',
  styleUrls: ['./contact-us.component.css'],
  templateUrl: './contact-us.component.html'})

export class ContactUsComponent implements OnInit {
  public contactForm: FormGroup;
  public emailDomainList: any[] = [
    { label: 'google.co.kr', value: 'google' },
    { label: 'naver.com', value: 'naver' },
  ];
  constructor(private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder) {
    this.breadcrumbService.setItems([
      { label: '1:1 문의', routerLink: ['/contact-us'] },
    ]);
  }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      email: new FormControl(null),
      emailDomain: new FormControl('google'),
      title: new FormControl(null, Validators.required),
      contents: new FormControl(null, Validators.required),
      files: new FormControl(null)
    });
  }

  onSubmit(value) {
    console.log(value);
  }
}
