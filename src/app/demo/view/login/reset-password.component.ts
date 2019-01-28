/**
 * Created by GRE511 on 2019-01-28.
 */
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./login.component.css']})

export class ResetPasswordComponent implements OnInit {
  public resetPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      password: new FormControl(null, Validators.required),
      rePassword: new FormControl(null, Validators.required)
    });
  }

  onSubmit(value) {
  }
}
