import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../../login/login.service";
import { Http, Headers } from "@angular/http";
import { FormControl, FormGroup, FormBuilder  } from '@angular/forms';

@Component({
    selector: 'user-modify',
    templateUrl: './user-modify.component.html',
    styleUrls: ['../../settings.component.css'],
    providers: [ LoginService ]
})
export class UserModifyComponent implements OnInit {
    public userSeq:string = '';

    public userform: FormGroup;
    public submitted: boolean;

    constructor(private formBuilder: FormBuilder, private loginService: LoginService, private http: Http) { }

    ngOnInit() {
        this.userform = this.formBuilder.group({
            'usr_seq': new FormControl(null),
            'usr_id': new FormControl(null),
            'usr_nm': new FormControl(null),
            'usr_mobile': new FormControl(null),
            'usr_tel': new FormControl(null),
            'usr_remark': new FormControl(null),
        });

        this.load();
    }

    load() {
        this.loadUserInfo();
    }

    loadUserInfo() {
        this.userSeq = this.loginService.getCookie('usr_seq');
        return this.http.get('http://183.110.11.49/cms/setting/user/' + this.userSeq)
          .toPromise()
          .then((cont) => {
              const getData:any[] = JSON.parse(cont['_body']);
              this.userform.get('usr_seq').setValue(getData['usr_seq']);
              this.userform.get('usr_id').setValue(getData['usr_id']);
              this.userform.get('usr_nm').setValue(getData['usr_nm']);
              this.userform.get('usr_mobile').setValue(getData['usr_mobile']);
              this.userform.get('usr_tel').setValue(getData['usr_tel']);
              this.userform.get('usr_remark').setValue(getData['usr_remark']);
          });
    }

    onSubmit(value:any) {
        const valueObject = {};
        this.submitted = true;

        valueObject['usr_seq'] = value.usr_seq;
        valueObject['usr_mobile'] = value.usr_mobile;
        valueObject['usr_tel'] = value.usr_tel;
        valueObject['usr_remark'] = value.usr_remark;

        this.updateUserInfo(valueObject);
    }

    updateUserInfo(newData:any) {
        let headers:Headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        return this.http.put('http://183.110.11.49/adm/user', newData, { headers: headers })
          .toPromise()
          .then(() => {window.location.reload();})
          .then(() => {alert('수정 완료되었습니다.');})
          .catch((error) => {
              console.log(error);
          })
    }
}
