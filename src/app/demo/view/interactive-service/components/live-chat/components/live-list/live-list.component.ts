/**
 * Created by GRE511 on 2019-01-10.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';

@Component({
  selector: 'live-list',
  styleUrls: ['../../../interactive-service.component.css'],
  templateUrl: './live-list.component.html'})

export class LiveListComponent implements OnInit {
  public liveCols:any[] = [
    { header: '', field: '', width: '5%' },
    { header: '채팅일자', field: 'chatDate' },
    { header: '사간', field: 'chatTime' },
    { header: '콘텐츠 명', field: 'contentsName' },
    { header: '파일명', field: 'fileName' },
    { header: '상태', field: 'chatStatus' },
  ];
  public liveRowData:any[] = [
    { chatDate: '2018.10.23', chatTime: '14:00 ~ 15:00', contentsName: '중1 영어 1강', fileName: 'asdfa.mp4', chatStatus: '예정' },
    { chatDate: '2018.10.23', chatTime: '14:00 ~ 15:00', contentsName: '중1 영어 1강', fileName: 'asdfa.mp4', chatStatus: '라이브' },
    { chatDate: '2018.10.23', chatTime: '14:00 ~ 15:00', contentsName: '중1 영어 1강', fileName: 'asdfa.mp4', chatStatus: '종료' },
  ];
  public tempCompareItems:any[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-chat/list'] },
      { label: '라이브채팅', routerLink: ['/interactive-service/live-chat/list'] },
    ]);
  }

  ngOnInit() {
  }
}
