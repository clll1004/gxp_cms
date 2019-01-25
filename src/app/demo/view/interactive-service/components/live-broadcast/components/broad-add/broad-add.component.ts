/**
 * Created by GRE511 on 2019-01-11.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { TwoWayService } from '../../../../../../../demo/service/twoway.service';
import { MediaStorageService } from '../../../../../../../demo/service/mediaStorage.service';

@Component({
  selector: 'broad-add',
  styleUrls: ['../../../interactive-service.component.css'],
  templateUrl: './broad-add.component.html'})

export class BroadAddComponent implements OnInit {
  public broadAddForm:FormGroup;

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

  public thumbSrc:string = '';

  public completeDialog:boolean = false;

  constructor(private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder, private mediaStorageService: MediaStorageService, private twoWayService: TwoWayService) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-broadcast/list'] },
      { label: '라이브방송', routerLink: ['/interactive-service/live-broadcast/list'] },
      { label: '등록', routerLink: ['/interactive-service/live-broadcast/add'] },
    ]);
  }

  ngOnInit() {
    this.broadAddForm = this.formBuilder.group({
      startTime: new FormControl(new Date()),
      endTime: new FormControl(new Date()),
      li_title: new FormControl(null),
      li_ft_seq: new FormControl(null),
      'fileToUpload[]': new FormControl(null),
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
    this.broadAddForm.get('li_ft_seq').setValue(this.selectedContent['fo_seq']);
  }

  onSubmit(value: any) {
    const valueObject = {
      li_sdate: this.convertDate(value.startTime),
      li_edate: this.convertDate(value.endTime),
      li_stime: this.convertTime(value.startTime),
      li_etime: this.convertTime(value.endTime),
      li_title: value.li_title,
      li_ft_seq: value.li_ft_seq,
      'fileToUpload[]': value['fileToUpload[]'],
    };
    this.twoWayService.addLiveBroad(valueObject)
      .then((status) => {
        if (status.ok) {
          this.completeDialog = true;
        }
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

  loadTumbnail(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.thumbSrc = event.target.result;
      };
    }
  }

  closePopup() {
    this.searchDialog = false;
    this.completeDialog = false;
  }
}
