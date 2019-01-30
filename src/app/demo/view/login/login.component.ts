/**
 * Created by GRE511 on 2019-01-28.
 */
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../../../demo/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']})

export class LoginComponent implements OnInit {
  public userData: any = {
    userId: '',
    userPassword: ''};
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user_id: new FormControl(null, Validators.required),
      user_password: new FormControl(null, Validators.required)
    });
  }

  onSubmit(value) {
    this.loginService.setLogin();
    if (value.user_id === 'admin') {
      this.loginService.setCookieData(0, 0);
      this.router.navigate(['/admin/realtime-monitoring']);
    } else {
      this.loginService.setCookieData(11, 24);
      this.router.navigate(['/dashboard']);
    }
    // this.submitted = true;
    //
    // this.userData.userId = value.user_id;
    // this.userData.userPassword = value.user_password;
    //
    // this.loginService.login(this.userData.userId, this.userData.userPassword)
    //   .toPromise()
    //   .then(() => {
    //     this.loginService.setLogin();
    //     this.loginService.setCookieData(11, 24);
    //     this.router.navigate(['']);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
}
