/**
 * Created by GRE511 on 2019-01-03.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'byPlayList',
  styleUrls: ['../../../statistics.component.css'],
  templateUrl: './byPlayList.component.html'})

export class ByPlayListComponent implements OnInit {
  public rangeDates:Date[] = [new Date(), new Date()];

  public barData:any;

  public playListCols:any[] = [
    { header: '순위', field: 'ranking' },
    { header: '재생목록', field: 'playList' },
    { header: '등록 영상 수', field: 'videoCount' },
    { header: '전체 재생수', field: 'totalPlayCount' },
    { header: '유니크 재생수', field: 'uniquePlayCount' },
    { header: '등록일', field: 'regdate' },
  ];
  public playListRowData:any[] = [
    { ranking: '1', playList: '중등 1학년', videoCount: '4545', totalPlayCount: '10345', uniquePlayCount: '4545', regdate: '2018-09-09' },
    { ranking: '2', playList: '자격증 교육', videoCount: '4545', totalPlayCount: '10345', uniquePlayCount: '4545', regdate: '2018-09-09' },
  ];

  constructor() {}

  ngOnInit() {
    this.barData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(248,121,16,.6)',
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };
  }
}
