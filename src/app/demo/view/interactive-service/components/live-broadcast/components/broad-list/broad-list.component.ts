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
    { header: '썸네일', field: 'thumbnail' },
    { header: '방송제목', field: 'broadName' },
    { header: '영상제목', field: 'contentsName' },
    { header: '등록일시', field: 'regdate' },
    { header: '수정일시', field: 'updateDate' },
  ];
  public broadRowData:any[] = [
    { time: '12:00 ~ 13:00', thumbnail: 'http://str.gomgxp.com/thail/GXP/2018/fLayoutTest/KakaoTalk_Video_20170612_1744_48_996/KakaoTalk_Video_20170612_1744_48_9960001.jpg', broadName: '2018 영어문법특강 1강', contentsName: '자격증 교육', regdate: '2019-09-09 05:30', updateDate: '2019-09-09 05:30' },
    { time: '12:00 ~ 13:00', thumbnail: 'http://str.gomgxp.com/thail/GXP/2018/%EA%B3%B5%EC%9D%B8%EC%A4%91%EA%B0%9C%EC%82%AC%20%EC%A4%91%EA%B0%9C%EC%82%AC%EB%B2%95%20%EC%95%94%EA%B8%B0%EB%B2%95%ED%8A%B9%EA%B0%95/%EA%B3%B5%EC%9D%B8%EC%A4%91%EA%B0%9C%EC%82%AC%20%EC%A4%91%EA%B0%9C%EC%82%AC%EB%B2%95%20%EC%95%94%EA%B8%B0%EB%B2%95%ED%8A%B9%EA%B0%950001.jpg', broadName: '2018 영어문법특강 1강', contentsName: '자격증 교육', regdate: '2019-09-09 05:30', updateDate: '2019-09-09 05:30' },
  ];
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
    this.loadLiveBroadList();
  }

  loadLiveBroadList() {
    const today = new Date();
    const month = (today.getMonth() + 1) < 10 ? `0${today.getMonth() + 1}` : (today.getMonth() + 1);
    const date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const convertDate = `${today.getFullYear()}-${month}-${date}`;

    this.twoWayService.getLiveBroadList(convertDate)
      .then((cont) => {
        console.log(cont);
      });
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
}
