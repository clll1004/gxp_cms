/**
 * Created by GRE511 on 2019-01-11.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';
import { TwoWayService } from '../../../../../../../demo/service/twoway.service';

@Component({
  selector: 'broad-list',
  styleUrls: ['../../../interactive-service.component.css'],
  templateUrl: './broad-list.component.html'})

export class BroadListComponent implements OnInit {
  public broadCols:any[] = [
    { header: '방송시간', field: 'time' },
    { header: '썸네일', field: 'li_img' },
    { header: '방송제목', field: 'li_title' },
    { header: '영상제목', field: 'ft_title' },
    { header: '등록일시', field: 'created_at' },
    { header: '수정일시', field: 'updated_at' },
  ];
  public broadRowData:any[] = [];
  public convertToday:string = '';
  public originTabData:any [] = [];
  public tabItem:any[] = [];
  public tabIndex:number = 0;

  constructor(private breadcrumbService: BreadcrumbService, private twoWayService: TwoWayService) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-broadcast/list'] },
      { label: '라이브방송', routerLink: ['/interactive-service/live-broadcast/list'] },
    ]);
  }

  ngOnInit() {
    this.load();
  }

  load() {
    const today = new Date();
    const month = (today.getMonth() + 1) < 10 ? `0${today.getMonth() + 1}` : (today.getMonth() + 1);
    const date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    this.convertToday = `${today.getFullYear()}-${month}-${date}`;
    this.loadLiveBroadWeekList(this.convertToday);
    this.loadLiveList();
  }

  loadLiveBroadWeekList(dateForLoadWeek) {
    this.tabItem = [];
    this.twoWayService.getLiveBroadWeekList(dateForLoadWeek)
      .then((cont) => {
        this.originTabData = cont['list'];
        for (let i = 1 ; i < this.originTabData.length - 1 ; i += 1) {
          this.tabItem.push(this.originTabData[i]);
        }
      });
  }

  loadPrevWeek() {
    this.loadLiveBroadWeekList(this.originTabData[0].date);
  }

  loadNextWeek() {
    this.loadLiveBroadWeekList(this.originTabData[this.originTabData.length - 1].date);
  }

  selectItem(e) {
    const target = e.currentTarget;
    if (target.getAttribute('class') !== 'on') {
      const tab = document.getElementById('selectTab').children;
      [].forEach.call(tab, (item) => {
        item.setAttribute('class', '');
      });
      target.setAttribute('class', 'on');
    }
    this.tabIndex = target.tabIndex;
  }

  loadLiveList() {
    this.twoWayService.getLiveBroadList()
      .then((cont) => {
        this.broadRowData = cont['list'];
      });
  }
}
