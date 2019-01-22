/**
 * Created by GRE511 on 2019-01-10.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';
import { TwoWayService } from '../../../../../../../demo/service/twoway.service';

@Component({
  selector: 'live-list',
  styleUrls: ['../../../interactive-service.component.css'],
  templateUrl: './live-list.component.html'})

export class LiveListComponent implements OnInit {
  public liveCols:any[] = [
    { header: '', field: '', width: '5%' },
    { header: '채팅일자', field: 'lc_sdate' },
    { header: '시간', field: 'chatTime' },
    { header: '콘텐츠 명', field: 'title' },
    { header: '파일명', field: 'ft_nm' },
    { header: '상태', field: 'lc_status' },
  ];
  public liveRowData:any[] = [];
  public tempSelectItems:any[] = [];
  public notSelectDialog:boolean = false;

  constructor(private breadcrumbService: BreadcrumbService, private twoWayService: TwoWayService) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-chat/list'] },
      { label: '라이브채팅', routerLink: ['/interactive-service/live-chat/list'] },
    ]);
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loadLiveChatList();
  }

  loadLiveChatList() {
    this.twoWayService.getLiveChatList()
      .then((cont) => {
        this.liveRowData = cont['list'];
        this.liveRowData.reverse();
        this.liveRowData.forEach((item) => {
          item.chatTime = `${item.lc_stime}~${item.lc_etime}`;
        });
      });
  }

  deleteSelectItem() {
    if (this.tempSelectItems.length === 0) {
      this.notSelectDialog = true;
      return false;
    }

    const valueArray:any[] = [];
    this.tempSelectItems.forEach((item) => {
      valueArray.push({ 'lc_seq': item.lc_seq });
    });
    this.twoWayService.deleteLiveChat(valueArray)
      .then(() => {
        this.tempSelectItems = [];
        this.loadLiveChatList();
      });
  }

  closePopup() {
    this.notSelectDialog = false;
  }
}
