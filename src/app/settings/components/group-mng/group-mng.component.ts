import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CookieService } from '../../../services/library/cookie/cookie.service';
import { SettingsService } from '../../../services/apis/cms/settings/settings.service';
import { CmsApis } from '../../../services/apis/apis';
import { ConfirmationService } from 'primeng/components/common/api';

@Component({
  selector: 'group-manager',
  templateUrl: './group-mng.component.html',
  styleUrls: ['../settings.component.css'],
  providers: [ConfirmationService]})

export class GroupMngComponent implements OnInit, OnChanges {
  @Input() groupSeq: any;

  public isLoading:boolean = true;

  public userSeq:string = '';
  public playerPresetForm: FormGroup;
  public submitted: boolean = false;
  public isShowMessage: boolean = false;
  public playerPresetKeys:any[] = ['playbackRate', 'loopPortion', 'bookmark', 'nextVideo', 'setting', 'fullscreen', 'cinemaMode', 'quality', 'subtitle'];

  public groupData: object = {};

  public transOptions: any[];
  public fileSuffix:any;
  public videoBit:any;
  public audioBit:any;
  public dstWidth:any;
  public dstHeight:any;
  public selectUseOption:any[] = [];
  public selectFPSOption:any[] = [];

  public transOptionsCols: any[] = [
        { field: '', header: 'No', width: '5%' },
        { field: '', header: '옵션명', width: '10%' },
        { field: '', header: '사용여부', width: '10%' },
        { field: '', header: '파일접미어', width: '10%' },
        { field: '', header: 'FPS', width: '15%' },
        { field: '', header: '비디오비트율', width: '10%' },
        { field: '', header: '오디오비트율', width: '10%' },
        { field: '', header: '해상도(가로)', width: '10%' },
        { field: '', header: '해상도(세로)', width: '10%' },
        { field: '', header: '수정', width: '10%' }];
  public transUse: any[] = [
        { label: '사용', value: 'Y' },
        { label: '사용안함', value: 'N' }];
  public transFPS: any[] = [
        { label: 'copy', value: 'copy' },
        { label: '29.97', value: '29.97' }];

  public tableStyle: any;

  constructor(private formBuilder: FormBuilder,
              private cookieService: CookieService,
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
      subtitle: new FormControl('Y'),
    });
  }

  ngOnChanges() {
    this.loadGroupData();
    this.loadPlayerPreset();
  }

  refresh() {
    window.location.reload();
  }

  loadGroupData() {
    this.groupData = {};
    this.transOptions = [];
    this.isLoading = true;
    this.settingsService.getLists(this.cmsApi.loadGroupMng + this.groupSeq)
      .toPromise()
      .then((cont) => {
        this.groupData = JSON.parse(cont['_body']).grp;
        this.transOptions = JSON.parse(cont['_body']).tcd;
        this.initDropDownOptions();
        this.initTableStyle();
      })
      .then(() => {
        this.isLoading = false;
      });
  }

  loadPlayerPreset() {
    this.userSeq = this.cookieService.getCookie('usr_seq');
    this.settingsService.getLists(`${this.cmsApi.playerPreset}/${this.groupSeq}`)
      .toPromise()
      .then((cont) => {
        const getData: any[] = JSON.parse(cont['_body']);
        this.playerPresetKeys.forEach((key) => {
          this.playerPresetForm.get(key).setValue(getData[key] === 'Y');
        });

        const labelButtons = document.getElementsByClassName('presetLabel');
        const checkBoxs = document.getElementsByClassName('presetCheckbox');
        let i = 0;
        [].forEach.call(labelButtons, (item: HTMLElement) => {
          if (item['htmlFor'] === checkBoxs[i]['id']) {
            checkBoxs[i]['checked'] ? item.setAttribute('class', 'presetLabel on') : item.setAttribute('class', 'presetLabel');
          }
          i += 1;
        });
      });
  }

  setPlayerPreset(e) {
    const target:HTMLElement = e.currentTarget;
    target.getAttribute('class') === 'presetLabel on' ? target.setAttribute('class', 'presetLabel') : target.setAttribute('class', 'presetLabel on');
  }

  initDropDownOptions() {
    this.transOptions.forEach((item) => {
      this.selectUseOption.push(item.gto_use_yn);
      this.selectFPSOption.push(item.gto_frame_rate);
    });
  }

  initTableStyle() {
    this.tableStyle = document.getElementById('transOptionTable').children[0].children[0];
    if (this.tableStyle) {
      this.tableStyle.style['overflow-x'] = 'unset';
    }
  }

  changeOption(index:number, gtoSeq:string) {
    this.getChangeOptions(index);

    const newData:any = {};
    newData['gto_seq'] = gtoSeq;
    newData['gto_use_yn'] = this.selectUseOption[index];
    newData['gto_file_suffix'] = this.fileSuffix.value;
    newData['gto_frame_rate'] = this.selectFPSOption[index];
    newData['gto_video_bitrate'] = this.videoBit.value;
    newData['gto_audio_bitrate'] = this.audioBit.value;
    newData['gto_dst_width'] = this.dstWidth.value;
    newData['gto_dst_height'] = this.dstHeight.value;

    this.settingsService.updateData(this.cmsApi.updateTransOption, newData)
      .toPromise()
      .then(() => {
        this.isShowMessage = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getChangeOptions(index:number) {
    this.fileSuffix = document.getElementById(`fileSuffix${index}`);
    this.videoBit = document.getElementById(`videoBit${index}`);
    this.audioBit = document.getElementById(`audioBit${index}`);
    this.dstWidth = document.getElementById(`dstWidth${index}`);
    this.dstHeight = document.getElementById(`dstHeight${index}`);
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

        valueObject['grp_seq'] = this.groupSeq;
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
