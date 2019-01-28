/**
 * Created by GRE511 on 2019-01-28.
 */
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./login.component.css']})

export class NewPasswordComponent implements OnInit {
  public newPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.newPasswordForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required)
    });
  }

  onSubmit(value) {
  }
}
