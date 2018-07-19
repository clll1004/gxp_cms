import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../../login/login.service";
import { Http, Headers } from "@angular/http";
import { PasswordFormValidator } from './passwordVaildator';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5'

@Component({
    selector: 'change-pswd',
    templateUrl: './change-pswd.component.html',
    styleUrls: ['../../settings.component.css']
})
export class ChangePswdComponent implements OnInit {
    public userSeq:string = '';

    public changePasswordform: FormGroup;
    public submitted: boolean;

    constructor(private formBuilder: FormBuilder, private loginService: LoginService, private http: Http) { }

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

        this.updatePassword(valueObject);
    }

    updatePassword(newData:any) {
        let headers:Headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        return this.http.put('http://183.110.11.49/cms/setting/user/password', newData, { headers: headers })
          .toPromise()
          .then((data) => {
              if(data.status == 200) {
                  window.location.reload();
                  alert('수정 완료되었습니다.');
              } else if (data.status == 204) {
                  alert('잘못된 비밀번호 입니다.');
              }
          })
          .catch((error) => {
              console.log(error);
          })
    }
}
