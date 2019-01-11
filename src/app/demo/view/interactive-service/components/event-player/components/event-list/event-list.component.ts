/**
 * Created by GRE511 on 2019-01-11.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';

@Component({
  selector: 'event-list',
  styleUrls: ['../../../interactive-service.component.css'],
  templateUrl: './event-list.component.html'})

export class EventListComponent implements OnInit {
  public eventCols:any[] = [
    { header: '이벤트 플레이어 제목', field: 'eventTitle' },
    { header: '미디어 보관함', field: 'mediaStorage' },
    { header: '적용된 영상 제목', field: 'targetContentName' },
    { header: '적용된 파일명', field: 'targetFileName' },
    { header: '서비스상태', field: 'status' },
    { header: '등록일시', field: 'regdate' },
    { header: '최종 수정일시', field: 'updateDate' },
  ];
  public eventRowData:any[] = [
    { eventTitle: '1강 이벤트', mediaStorage: '중등교육', targetContentName: '중1영어 1강', targetFileName: 'adfa.mp4', status: 'ON', regdate: '2018-09-09 05:30:22', updateDate: '2018-09-09 05:30:22' },
    { eventTitle: '2강 이벤트', mediaStorage: '중등교육', targetContentName: '중1영어 1강', targetFileName: 'adfa.mp4', status: 'ON', regdate: '2018-09-09 05:30:22', updateDate: '2018-09-09 05:30:22' },
    { eventTitle: '3강 이벤트', mediaStorage: '중등교육', targetContentName: '중1영어 1강', targetFileName: 'adfa.mp4', status: 'ON', regdate: '2018-09-09 05:30:22', updateDate: '2018-09-09 05:30:22' },
  ];
  public tempCompareItems:any[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-chat/list'] },
      { label: '이벤트 플레이어', routerLink: ['/interactive-service/event-player/list'] },
    ]);
  }

  ngOnInit() {
  }
}
