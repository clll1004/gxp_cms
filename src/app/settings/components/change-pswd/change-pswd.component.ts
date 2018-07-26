import { Component, OnInit } from '@angular/core';
import { PasswordFormValidator } from './passwordVaildator';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { LoginService } from "../../../login/login.service";
import { SettingsService } from '../../../services/apis/cms/settings/settings.service';
import { CmsApis } from '../../../services/apis/apis';

@Component({
    selector: 'change-pswd',
    templateUrl: './change-pswd.component.html',
    styleUrls: ['../../settings.component.css']
})
export class ChangePswdComponent implements OnInit {
    public userSeq:string = '';

    public changePasswordform: FormGroup;
    public submitted: boolean;

    constructor(private formBuilder: FormBuilder,
                private loginService: LoginService,
                private settingsService: SettingsService,
                private cmsApis: CmsApis) { }

    ngOnInit() {
        this.load();
        this.changePasswordform = this.formBuilder.group({
            'usr_seq': new FormControl(null),
            'usr_pw_old': new FormControl(null, Validators.required),
            'usr_pw': new FormControl(null, Validators.required),
            'usr_pw_cf': new FormControl(null, Validators.required)
        }, {
            validator: PasswordFormValidator.checkPassword
        });
    }
    load() {
        this.loadUserSeq();
    }
    loadUserSeq() {
        this.userSeq = this.loginService.getCookie('usr_seq');
    }
    onSubmit(value:any) {
        const valueObject = {};
        this.submitted = true;

        valueObject['usr_seq'] = this.userSeq;
        valueObject['usr_pw_old'] = Md5.hashStr(value.usr_pw_old);
        valueObject['usr_pw'] = Md5.hashStr(value.usr_pw);

        this.settingsService.updateData(this.cmsApis.updatePassword, valueObject)
          .toPromise()
          .then((data) => {
              if(data.status == 200) {
                  window.location.reload();
                  alert('수정 완료되었습니다.');
              } else if (data.status == 204) {
                  alert('현재 비밀번호를 확인해주세요.');
              }
          })
          .catch((error) => {
              console.log(error);
          });
    }
}
