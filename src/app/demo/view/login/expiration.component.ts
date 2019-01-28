/**
 * Created by GRE511 on 2019-01-28.
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'expiration',
  templateUrl: './expiration.component.html',
  styleUrls: ['./expiration.component.css']})

export class ExpirationComponent implements OnInit {
  public showDialog:boolean = false;
  public contactForm: FormGroup;
  public emailDomainList: any[] = [
    { label: 'google.co.kr', value: 'google' },
    { label: 'naver.com', value: 'naver' },
  ];

  constructor(private formBuilder: FormBuilder) {
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

  closePopup() {
    this.showDialog = false;
  }
}
