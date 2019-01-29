/**
 * Created by GRE511 on 2019-01-28.
 */
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./login.component.css']})

export class NewAccountComponent implements OnInit {
  public newAccountForm: FormGroup;
  public privacyPolicyDialog:boolean = false;
  public policyDialog:boolean = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.newAccountForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      allAgreeChecked: new FormControl(false),
      policy: new FormControl(false, Validators.required),
      privacy: new FormControl(false, Validators.required),
    });
  }

  onSubmit(value) {
    const valueObject = value;
    delete valueObject['allAgreeChecked'];
    console.log(valueObject);
  }

  closePopup() {
    this.privacyPolicyDialog = false;
    this.policyDialog = false;
  }

  toggleCheckboxs() {
    this.newAccountForm.get('policy').setValue(this.newAccountForm.get('allAgreeChecked').value);
    this.newAccountForm.get('privacy').setValue(this.newAccountForm.get('allAgreeChecked').value);
  }
}
