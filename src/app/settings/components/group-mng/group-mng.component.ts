import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SettingsService } from '../../../services/apis/cms/settings/settings.service';
import { CmsApis } from '../../../services/apis/apis';

@Component({
  selector: 'group-manager',
  templateUrl: './group-mng.component.html',
  styleUrls: ['../../settings.component.css'],
  providers: [SettingsService, CmsApis]})

export class GroupMngComponent implements OnInit, OnChanges {
  @Input() groupSeq: any;

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
  public isShowMessage: boolean = false;

  public tableStyle: any;

  constructor(private settingsService: SettingsService, private cmsApis: CmsApis) { }

  ngOnInit() {
    this.loadGroupData();
  }

  ngOnChanges() {
    this.loadGroupData();
  }

  loadGroupData() {
    this.settingsService.getLists(this.cmsApis.loadGroupMng + this.groupSeq)
      .toPromise()
      .then((cont) => {
        this.groupData = JSON.parse(cont['_body']).grp;
        this.transOptions = JSON.parse(cont['_body']).tcd;
        this.initDropDownOptions();
        this.initTableStyle();
      });
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

    this.settingsService.updateData(this.cmsApis.updateTransOption, newData)
      .toPromise()
      .then(() => {
        this.isShowMessage = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getChangeOptions(index:number) {
    this.fileSuffix = document.getElementById('fileSuffix' + index);
    this.videoBit = document.getElementById('videoBit' + index);
    this.audioBit = document.getElementById('audioBit' + index);
    this.dstWidth = document.getElementById('dstWidth' + index);
    this.dstHeight = document.getElementById('dstHeight' + index);
  }
}
