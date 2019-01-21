/**
 * Created by GRE511 on 2019-01-16.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../../../breadcrumb.service';
import { TwoWayService } from '../../../../../../../../../demo/service/twoway.service';

@Component({
  selector: 'manager-list',
  styleUrls: ['../../../../../interactive-service.component.css'],
  templateUrl: './manager-list.component.html'})

export class ManagerListComponent implements OnInit {
  public managerCols:any[] = [
    { header: '광고', field: 'ad_img', width: '200px' },
    { header: '제목', field: 'ad_nm' },
    { header: '등록일시', field: 'created_at' },
    { header: '최종 수정일시', field: 'updated_at' },
  ];
  public managerRowData:any[] = [];
  public tempCompareItems:any[] = [];

  constructor(private breadcrumbService: BreadcrumbService, private twoWayService: TwoWayService) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-chat/list'] },
      { label: '실시간 광고 전송', routerLink: ['/interactive-service/ad-manage/manager/manager-list'] },
      { label: '광고 관리', routerLink: ['/interactive-service/ad-manage/manager/manager-list'] },
    ]);
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loadADList();
  }

  loadADList() {
    this.twoWayService.getAdList()
      .then((cont) => {
        this.managerRowData = cont['list'];
        this.managerRowData.reverse();
      })
  }
}
