import { Component, OnInit } from '@angular/core';
import { CookieService } from '../../../services/library/cookie/cookie.service';
import { FormControl, FormGroup, FormBuilder  } from '@angular/forms';
import { SettingsService } from '../../../services/apis/cms/settings/settings.service';
import { CmsApis } from '../../../services/apis/apis';

@Component({
  selector: 'user-modify',
  templateUrl: './user-modify.component.html',
  styleUrls: ['../settings.component.css']})

export class UserModifyComponent implements OnInit {
  public isLoading:boolean = false;
  public userSeq:string = '';

  public userform: FormGroup;
  public submitted: boolean;
  public isShow: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private cookieService: CookieService,
              private settingsService: SettingsService,
              private cmsApi: CmsApis) { }

  ngOnInit() {
    this.userform = this.formBuilder.group({
      usr_seq: new FormControl(null),
      usr_id: new FormControl(null),
      usr_nm: new FormControl(null),
      usr_mobile: new FormControl(null),
      usr_tel: new FormControl(null),
      usr_remark: new FormControl(null)});

    this.load();
  }

  load() {
    this.loadUserInfo();
  }

  isShowPopup(e:boolean) {
    this.isShow = e;
  }

  loadUserInfo() {
    this.isLoading = true;
    this.userSeq = this.cookieService.getCookie('usr_seq');
    this.settingsService.getLists(this.cmsApi.loadUserInfo + this.userSeq)
      .toPromise()
      .then((cont) => {
        const getData:any[] = JSON.parse(cont['_body']);
        this.userform.get('usr_seq').setValue(getData['usr_seq']);
        this.userform.get('usr_id').setValue(getData['usr_id']);
        this.userform.get('usr_nm').setValue(getData['usr_nm']);
        this.userform.get('usr_mobile').setValue(getData['usr_mobile']);
        this.userform.get('usr_tel').setValue(getData['usr_tel']);
        this.userform.get('usr_remark').setValue(getData['usr_remark']);
      })
      .then(() => {
        this.isLoading = false;
      });
  }

  onSubmit(value:any) {
    const valueObject = {};
    this.submitted = true;

    valueObject['usr_seq'] = value.usr_seq;
    valueObject['usr_mobile'] = value.usr_mobile;
    valueObject['usr_tel'] = value.usr_tel;
    valueObject['usr_remark'] = value.usr_remark;

    this.settingsService.updateData(this.cmsApi.updateUserInfo, valueObject)
      .toPromise()
      .then(() => {
        this.isShowPopup(true);
        this.submitted = false;
        this.loadUserInfo();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  refresh() {
    window.location.reload();
  }
}
