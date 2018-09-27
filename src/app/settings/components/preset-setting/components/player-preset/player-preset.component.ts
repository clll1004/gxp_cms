/**
 * Created by GRE511 on 2018-09-12.
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../../../../../login/login.service';
import { SettingsService } from '../../../../../services/apis/cms/settings/settings.service';
import { CmsApis } from '../../../../../services/apis/apis';
import { ConfirmationService } from 'primeng/components/common/api';

@Component({
  selector: 'player-preset',
  templateUrl: './player-preset.component.html',
  styleUrls:['./player-preset.component.css'],
  providers: [LoginService, SettingsService, CmsApis, ConfirmationService]})

export class PlayerPresetComponent implements OnInit {
  public userSeq:string = '';
  public playerPresetForm: FormGroup;
  public submitted: boolean = false;
  public isShowMessage: boolean = false;
  public playerPresetKeys:any[] = ['playbackRate', 'loopPortion', 'bookmark', 'nextVideo', 'setting', 'fullscreen', 'cinemaMode', 'quality'];

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private settingsService: SettingsService,
              private cmsApi: CmsApis,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.playerPresetForm = this.formBuilder.group({
      playbackRate: new FormControl('Y'),
      loopPortion: new FormControl('Y'),
      bookmark: new FormControl('Y'),
      nextVideo: new FormControl('Y'),
      setting: new FormControl('Y'),
      fullscreen: new FormControl('Y'),
      cinemaMode: new FormControl('Y'),
      quality: new FormControl('Y'),
    });

    this.loadPlayerPreset();
  }

  loadPlayerPreset() {
    this.userSeq = this.loginService.getCookie('usr_seq');
    this.settingsService.getLists(this.cmsApi.playerPreset + '/' + this.userSeq)
      .toPromise()
      .then((cont) => {
        const getData:any[] = JSON.parse(cont['_body']);
        this.playerPresetKeys.forEach((key) => {
          this.playerPresetForm.get(key).setValue(getData[key] === 'Y');
        });

        const labelButtons = document.getElementsByTagName('label');
        const checkBoxs = document.getElementsByClassName('presetCheckbox');
        let i = 0;
        [].forEach.call(labelButtons, (item:HTMLElement) => {
          if (item.getAttribute('for') === checkBoxs[i].getAttribute('id')) {
            checkBoxs[i]['checked'] ? item.setAttribute('class', 'on') : item.setAttribute('class', '');
          }
          i += 1;
        });
      });
  }

  setPlayerPreset(e) {
    const target = e.currentTarget;
    target.getAttribute('class') === 'on' ? target.setAttribute('class', '') : target.setAttribute('class', 'on');
  }

  refresh() {
    window.location.reload();
  }

  resetPreset() {
    this.confirmationService.confirm({
      message: '설정을 초기화하시겠습니까?',
      accept: () => {
        this.loadPlayerPreset();
      },
    });
  }

  onSubmit(value:any) {
    this.confirmationService.confirm({
      message: '적용하시겠습니까?',
      accept: () => {
        const valueObject = {};
        this.submitted = true;

        valueObject['cus_seq'] = this.userSeq;
        this.playerPresetKeys.forEach((key) => {
          valueObject[key] = value[key] ? 'Y' : 'N';
        });

        this.settingsService.updateData(this.cmsApi.playerPreset, valueObject)
          .toPromise()
          .then(() => {
            this.isShowMessage = true;
            this.submitted = false;
            this.loadPlayerPreset();
          });
      },
    });
  }
}
