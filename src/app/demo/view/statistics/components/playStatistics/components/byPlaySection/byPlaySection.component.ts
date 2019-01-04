/**
 * Created by GRE511 on 2019-01-03.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';

@Component({
  selector: 'byPlaySection',
  styleUrls: ['../../../statistics.component.css'],
  templateUrl: './byPlaySection.component.html'})

export class ByPlaySectionComponent implements OnInit {
  public rangeDates:Date[] = [new Date(), new Date()];

  public isCompareStatus:boolean = false;

  public playSectionCols:any[] = [
    { header: '', field: '', width: '5%' },
    { header: 'CID', field: 'cid', width: '5%' },
    { header: '제목', field: 'title', width: '10%' },
    { header: '미디어 보관함', field: 'mediaStorage', width: '10%' },
    { header: '재생목록', field: 'playList', width: '30%' },
    { header: '파일명', field: 'fileName', width: '10%' },
    { header: '영상길이', field: 'videoTime', width: '10%' },
    { header: '시청시간', field: 'viewingTime', width: '10%' },
    { header: '유니크 재생수', field: 'uniquePlayCount', width: '15%' },
    { header: '전체 재생수', field: 'totalPlayCount', width: '10%' },
  ];
  public playSectionRowData:any[] = [
    { cid: '1231', title: '공인중개사 6강', mediaStorage: 'GXP', playList: '자격증 교육', fileName: 'adf.mp4', videoTime: '04h 13m 22s', viewingTime: '04h 13m 22s', uniquePlayCount: '12342', totalPlayCount: '1235' },
    { cid: '2342', title: '뮤직뱅크 5회', mediaStorage: '음악', playList: '음악방송 12월분', fileName: 'adf.mp4', videoTime: '04h 13m 22s', viewingTime: '04h 13m 22s', uniquePlayCount: '12342', totalPlayCount: '1235' },
  ];
  public tempCompareItems:any[] = [];

  public lineData:any;

  /*result table data*/
  public compareSectionCols:any[] = [
    { header: '일자', field: 'date', width: '10%'  },
    { header: '10%', field: 'p10' },
    { header: '20%', field: 'p20' },
    { header: '30%', field: 'p30' },
    { header: '40%', field: 'p40' },
    { header: '50%', field: 'p50' },
    { header: '60%', field: 'p60' },
    { header: '70%', field: 'p70' },
    { header: '80%', field: 'p80' },
    { header: '90%', field: 'p90' },
    { header: '100%', field: 'p100' },
  ];
  public compareSectionDatas:any[] = [
    { date: '2018-09-01', p10: '234', p20: '525', p30: '124', p40: '120', p50: '124', p60: '124', p70: '124', p80: '124', p90: '124', p100: '124' },
    { date: '2018-09-02', p10: '234', p20: '525', p30: '124', p40: '120', p50: '124', p60: '124', p70: '124', p80: '124', p90: '124', p100: '124' },
  ];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '통계', routerLink: ['/statistics/play-statistics/byDate'] },
      { label: '재생 통계', routerLink: ['/statistics/play-statistics/byDate'] },
      { label: '재생 구간', routerLink: ['/statistics/play-statistics/byPlaySection'] },
    ]);

    this.lineData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          backgroundColor: 'rgba(248,121,16,.2)',
          borderColor: '#f87910'
        }
      ]
    };
  }

  ngOnInit() {
  }
}
