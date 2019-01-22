/**
 * Created by GRE511 on 2019-01-10.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TwoWayService } from '../../../../../../../demo/service/twoway.service';
import { MediaStorageService } from '../../../../../../../demo/service/mediaStorage.service';

@Component({
  selector: 'live-add',
  styleUrls: ['../../../interactive-service.component.css'],
  templateUrl: './live-add.component.html'})

export class LiveAddComponent implements OnInit {
  public liveAddForm:FormGroup;

  public searchDialog:boolean = false;
  public storageList:any = [];
  public selectedStorage: any = 'all';
  public searchContentCols:any[] = [
    { header: '미디어보관함', field: 'gf_nm' },
    { header: '콘텐츠명', field: 'title' },
    { header: '파일명', field: 'fo_nm' },
  ];
  public searchContentRowData:any[] = [];
  public selectedContent:object = {};

  public completeDialog:boolean = false;

  constructor(private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder, private twoWayService: TwoWayService, private mediaStorageService: MediaStorageService) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-chat/list'] },
      { label: '라이브채팅', routerLink: ['/interactive-service/live-chat/list'] },
      { label: '등록', routerLink: ['/interactive-service/live-chat/add'] },
    ]);
  }

  ngOnInit() {
    this.liveAddForm = this.formBuilder.group({
      startTime: new FormControl(new Date()),
      endTime: new FormControl(new Date()),
      lc_ft_seq: new FormControl(null, Validators.required),
      lc_status: new FormControl({ value: '대기', disabled: true }),
    });
  }

  loadSelectContents() {
    this.loadMediaStorageTitle();
    this.loadMediaStorageList();
  }

  loadMediaStorageTitle() {
    this.mediaStorageService.getStorageListTitle()
      .then((cont) => {
        this.storageList = cont['list'].map((item) => {
          const temp:object = {};
          temp['label'] = item.title;
          temp['value'] = item.gf_seq;
          return temp;
        });
        this.storageList.unshift({
          label: '전체',
          value: 'all',
        });
        this.selectedStorage = 'all';
      });
  }

  loadMediaStorageList(seq:any = 'all') {
    this.mediaStorageService.getStorageList(seq)
      .then((cont) => {
        this.searchContentRowData = cont['list'];
        this.searchContentRowData.reverse();
      });
  }

  selectContentComplete() {
    this.liveAddForm.get('lc_ft_seq').setValue(this.selectedContent['fo_seq']);
  }

  onSubmit(value: any) {
    const valueObject = { lc_sdate: '', lc_edate: '', lc_stime: '', lc_etime: '', lc_ft_seq: '', lc_status: '' };
    valueObject.lc_sdate = this.convertDate(value.startTime);
    valueObject.lc_edate = this.convertDate(value.endTime);
    valueObject.lc_stime = this.convertTime(value.startTime);
    valueObject.lc_etime = this.convertTime(value.endTime);
    valueObject.lc_ft_seq = value.lc_ft_seq;
    valueObject.lc_status = '대기';

    this.twoWayService.addLiveChat(valueObject)
      .then(() => {
        this.completeDialog = true;
      });
  }

  convertDate(input) {
    const inputDate = new Date(input);
    const month = (inputDate.getMonth() + 1) < 10 ? `0${inputDate.getMonth() + 1}` : (inputDate.getMonth() + 1);
    const date = inputDate.getDate() < 10 ? `0${inputDate.getDate()}` : inputDate.getDate();
    return `${inputDate.getFullYear()}-${month}-${date}`;
  }

  convertTime(input) {
    const inputTime = new Date(input);
    const hour = inputTime.getHours() < 10 ? `0${inputTime.getHours()}` : inputTime.getHours();
    const miniute = inputTime.getMinutes() < 10 ? `0${inputTime.getMinutes()}` : inputTime.getMinutes();
    const second = inputTime.getSeconds() < 10 ? `0${inputTime.getSeconds()}` : inputTime.getSeconds();
    return `${hour}:${miniute}:${second}`;
  }

  closePopup() {
    this.searchDialog = false;
    this.completeDialog = false;
  }
}
