import { Component, OnInit } from '@angular/core';
import { PasswordFormValidator } from './passwordVaildator';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from '../../../services/library/cookie/cookie.service';
import { SettingsService } from '../../../services/apis/cms/settings/settings.service';
import { Sha256 } from '../../../services/library/hash/sha256';
import { CmsApis } from '../../../services/apis/apis';

@Component({
  selector: 'change-password',
  templateUrl: './change-pswd.component.html',
  styleUrls: ['../settings.component.css'],
  providers: [Sha256]})

export class ChangePswdComponent implements OnInit {
  public userSeq:string = '';

  public changePasswordform: FormGroup;
  public submitted: boolean;
  public isShow:boolean = false;
  public popupMessage:string = '';

  constructor(private formBuilder: FormBuilder,
              private cookieService: CookieService,
              private settingsService: SettingsService,
              private cmsApi: CmsApis,
              private sha256: Sha256) { }

  ngOnInit() {
    this.load();
    this.initForm();
  }

  load() {
    this.loadUserSeq();
  }

  isShowPopup(e:boolean) {
    this.isShow = e;
  }

  loadUserSeq() {
    this.userSeq = this.cookieService.getCookie('usr_seq');
  }

  onSubmit(value:any) {
    const valueObject = {};
    this.submitted = true;

    valueObject['usr_seq'] = this.userSeq;
    valueObject['usr_pw_old'] = this.sha256.get(value.usr_pw_old);
    valueObject['usr_pw'] = this.sha256.get(value.usr_pw);

    this.settingsService.updateData(this.cmsApi.updatePassword, valueObject)
      .toPromise()
      .then((data) => {
        if (data.status === 200) {
          this.popupMessage = '수정완료 되었습니다.';
          this.isShowPopup(true);
          this.initForm();
        } else if (data.status === 204) {
          this.popupMessage = '현재 비밀번호를 확인해주세요.';
          this.isShowPopup(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  initForm() {
    this.changePasswordform = this.formBuilder.group({
      usr_seq: new FormControl(null),
      usr_pw_old: new FormControl(null, Validators.required),
      usr_pw: new FormControl(null, Validators.required),
      usr_pw_cf: new FormControl(null, Validators.required) },
      { validator: PasswordFormValidator.checkPassword });
  }

  refresh() {
    window.location.reload();
  }
}
