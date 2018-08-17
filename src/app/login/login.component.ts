import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Sha256 } from '../services/library/hash/sha256';
import { CmsApis } from '../services/apis/apis';
import { LoginService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [Sha256, CmsApis]})

export class LoginComponent implements OnInit{
  public userData: any = {
    userId: '',
    userPassword: ''};
  public loginform: FormGroup;
  public submitted: boolean = false;
  public isShowLoginMessage: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private loginService: LoginService,
              private sha256: Sha256,
              private cmsApis: CmsApis) { }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      user_id: new FormControl(null, Validators.required),
      user_password: new FormControl(null, Validators.required)});
  }

  onSubmit(value: any) {
    this.submitted = true;

    this.userData.userId = value.user_id;
    this.userData.userPassword = this.sha256.get(value.user_password);

    this.loginService.login(this.cmsApis.login, this.userData.userId, this.userData.userPassword)
      .toPromise()
      .then((data) => {
        this.loginService.setLogin();
        const serverData = JSON.parse(data['_body']);
        const user = this.userData.userId + '/' + this.userData.userPassword;
        this.loginService.setCookieData(user, serverData.usr_seq, serverData.usr_nm, serverData.grp_seq);
        this.router.navigate(['/', 'contents']);
      })
      .catch((error) => {
        this.isShowLoginMessage = true;
        console.log(error);
      });
  }
}
