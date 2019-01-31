/**
 * Created by GRE511 on 2019-01-30.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../breadcrumb.service';
import { Validators, FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'client-detail',
  styleUrls: ['../sAdmin.component.css'],
  templateUrl: './client-detail.component.html'})

export class ClientDetailComponent implements OnInit {
  public clientForm: FormGroup;
  public yearRange: string = `${new Date().getFullYear() - 3}:${new Date().getFullYear() + 10}`;
  public localeObject: object = {
    firstDayOfWeek: 0,
    dayNamesMin: ['일','월','화','수','목','금','토'],
    monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
    today: 'Today',
    clear: 'Clear',
  };
  public minDate: Date = new Date();
  public isSetAuthKey: boolean = false;

  constructor(private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder) {
    this.breadcrumbService.setItems([
      { label: '고객사관리', routerLink: ['/admin/client-manager'] },
      { label: '상세', routerLink: ['/admin/client-detail'] },
    ]);
  }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      licenseKey: this.formBuilder.group({
        key: new FormControl(null),
        domain: new FormControl(null, Validators.required),
        sdate: new FormControl(new Date()),
        edate: new FormControl(new Date()),
      }),
      playerPreset: this.formBuilder.group({
        service_type: new FormControl('일반'),
        bookmark: new FormControl(true),
        setting: new FormControl(true),
        nextVideo: new FormControl(true),
        playbackRate: new FormControl(true),
        loopPortion: new FormControl(true),
        fullscreen: new FormControl(true),
        cinemaMode: new FormControl(true),
        quality: new FormControl(true),
        subtitle: new FormControl(true),
      }),
      thm: this.formBuilder.array([
        this.formBuilder.group({
          gts_ftp_ip: new FormControl(null),
          gts_ftp_port: new FormControl(null),
          gts_ftp_id: new FormControl(null),
          gts_ftp_pw: new FormControl(null),
        })
      ]),
      encoding: this.formBuilder.group({
        explain: new FormControl(null),
        thumbDomain: new FormControl(null),
        subUrl: new FormControl(null),
        callbackUrl: new FormControl(null),
      }),
      encodingOption: this.formBuilder.array([
        this.formBuilder.group({
          explain: new FormControl(null),
          thumbDomain: new FormControl(null),
          subUrl: new FormControl(null),
          callbackUrl: new FormControl(null),
        })
      ]),
    });
  }

  onSubmit(value) {
    console.log(value);
  }

  setAuthkey() {
    this.isSetAuthKey = true;
    const authkey = this.clientForm.get('licenseKey').get('key');
    const btn = document.getElementById('authkey_btn');
    authkey.setValue('ADSFADSFASDFAFD');
    btn.style.background = '#ddd';
    btn.style.cursor = 'default';
    btn.style.color = '#666';
  }

  setPlayerPreset(e) {
    const target:HTMLElement = e.currentTarget;
    target.getAttribute('class') === 'presetLabel on' ? target.setAttribute('class', 'presetLabel') : target.setAttribute('class', 'presetLabel on');
  }

  addFormGroup(target) {
    let addObject:object = {};
    if (target === 'thm') {
      addObject = {
        gts_ftp_ip: new FormControl(null),
        gts_ftp_port: new FormControl(null),
        gts_ftp_id: new FormControl(null),
        gts_ftp_pw: new FormControl(null),
      };
    } else {
      addObject = {
        explain: new FormControl(null),
        thumbDomain: new FormControl(null),
        subUrl: new FormControl(null),
        callbackUrl: new FormControl(null),
      };
    }
    (<FormArray>this.clientForm.get(target)).push(
      this.formBuilder.group(addObject),
    );
  }

  get thmData() { return <FormArray>this.clientForm.get('thm'); }
  get encodingOptionData() { return <FormArray>this.clientForm.get('encodingOption'); }
}
