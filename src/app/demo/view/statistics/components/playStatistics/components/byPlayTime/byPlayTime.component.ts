/**
 * Created by GRE511 on 2019-01-03.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';

@Component({
  selector: 'byPlayTime',
  styleUrls: ['../../../statistics.component.css'],
  templateUrl: './byPlayTime.component.html'})

export class ByPlayTimeComponent implements OnInit {
  public rangeDates:Date[] = [new Date(), new Date()];

  public isCompareStatus:boolean = false;

  public playTimeCols:any[] = [
    { header: '', field: '', width: '5%' },
    { header: 'CID', field: 'cid', width: '5%' },
    { header: '제목', field: 'title', width: '10%' },
    { header: '파일명', field: 'fileName', width: '10%' },
    { header: '미디어 보관함', field: 'mediaStorage', width: '10%' },
    { header: '재생목록', field: 'playList', width: '30%' },
    { header: '영상길이', field: 'videoTime', width: '10%' },
    { header: '시청시간', field: 'viewingTime', width: '10%' },
    { header: '전체 재생수', field: 'totalPlayCount', width: '10%' },
    { header: '유니크 재생수', field: 'uniquePlayCount', width: '15%' },
  ];
  public playTimeRowData:any[] = [
    { cid: '1231', title: '공인중개사 6강', fileName: 'adf.mp4', mediaStorage: 'GXP', playList: '자격증 교육', videoTime: '04h 13m 22s', viewingTime: '04h 13m 22s', totalPlayCount: '1235', uniquePlayCount: '12342' },
    { cid: '2342', title: '뮤직뱅크 5회', fileName: 'adf.mp4', mediaStorage: '음악', playList: '음악방송 12월분', videoTime: '04h 13m 22s', viewingTime: '04h 13m 22s', totalPlayCount: '1235', uniquePlayCount: '12342' },
  ];

  public compareHeaderCols:any[] = [
    { header: '검색기간', field: '', width: '15%' },
    { header: 'CID', field: 'cid', width: '10%' },
    { header: '제목', field: 'title', width: '10%' },
    { header: '파일명', field: 'contentsName', width: '30%' },
    { header: '미디어보관함', field: 'mediaStorage', width: '12%' },
    { header: '재생목록', field: 'playList', width: '10%' },
    { header: '영상길이', field: 'videoTime', width: '10%' },
    { header: '시청시간', field: 'viewingTime', width: '10%' },
    { header: '전체 재생수', field: 'totalPlayCount', width: '10%' },
    { header: '유니크 재생수', field: 'uniquePlayCount', width: '12%' },
    { header: '', field: '', width: '10%' },
  ];
  public compareItems:any[] = [];

  public tempCompareItems:any[] = [];

  public lineData:any;

  public resultCols:any[] = [
    { header: 'CID', field: 'cid' },
    { header: '제목', field: 'title' },
    { header: '파일명', field: 'contentsName' },
    { header: '일자', field: 'date' },
    { header: '재생시간', field: 'playTime' },
    { header: '전체 재생수', field: 'totalPlayCount' },
    { header: '유니크 재생수', field: 'uniquePlayCount' },
    { header: '평균 재생시간', field: 'averagePlayTime' },
  ];
  public resultRowData:any[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '통계', routerLink: ['/statistics/play-statistics/byDate'] },
      { label: '재생 통계', routerLink: ['/statistics/play-statistics/byDate'] },
      { label: '재생 시간', routerLink: ['/statistics/play-statistics/byPlayTime'] },
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
