/**
 * Created by GRE511 on 2019-01-10.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'live-add',
  styleUrls: ['../../../interactive-service.component.css'],
  templateUrl: './live-add.component.html'})

export class LiveAddComponent implements OnInit {
  public liveAddForm:FormGroup;

  public searchDialog:boolean = false;
  public storageList:any = [{ label: '전체', value: 'all' }, { label: '광고전송', value: 'transmitAd' }, { label: '스킨변경', value: 'changeSkin' }];
  public selectedStorage: any = 'all';
  public searchContentCols:any[] = [
    { header: '미디어보관함', field: 'mediaStorage' },
    { header: '콘텐츠명', field: 'contentsName' },
    { header: '파일명', field: 'fileName' },
  ];
  public searchContentRowData:any[] = [
    { cid: 0, mediaStorage: '중등교육1', contentsName: '중1 영어 1강', fileName: 'asdfa.mp4' },
    { cid: 1, mediaStorage: '중등교육2', contentsName: '중1 영어 1강', fileName: 'asdfa.mp4' },
    { cid: 2, mediaStorage: '중등교육3', contentsName: '중1 영어 1강', fileName: 'asdfa.mp4' },
    { cid: 3, mediaStorage: '중등교육4', contentsName: '중1 영어 1강', fileName: 'asdfa.mp4' },
    { cid: 4, mediaStorage: '중등교육1', contentsName: '중1 영어 1강', fileName: 'asdfa.mp4' },
    { cid: 5, mediaStorage: '중등교육2', contentsName: '중1 영어 1강', fileName: 'asdfa.mp4' },
    { cid: 6, mediaStorage: '중등교육3', contentsName: '중1 영어 1강', fileName: 'asdfa.mp4' },
    { cid: 7, mediaStorage: '중등교육4', contentsName: '중1 영어 1강', fileName: 'asdfa.mp4' },
  ];
  public selectedContent:object = {};

  constructor(private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder) {
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
      contentName: new FormControl(null),
      status: new FormControl({ value: 'standby', disabled: true }),
    });
  }

  onSubmit(value: any) {
    value.contentName = this.selectedContent;
    console.log(value);
  }

  closePopup() {
    this.searchDialog = false;
  }
}
