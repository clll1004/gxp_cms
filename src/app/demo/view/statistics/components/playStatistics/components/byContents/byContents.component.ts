/**
 * Created by GRE511 on 2019-01-03.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'byContents',
  styleUrls: ['../../../statistics.component.css'],
  templateUrl: './byContents.component.html'})

export class ByContentsComponent implements OnInit {
  public rangeDates:Date[] = [new Date(), new Date()];

  public barData:any;

  public typeOption:any = [{ label: '재생목록', value: 'playList' }, { label: '동영상', value: 'video' }];
  public selectedType: any = 'video';

  public mediaOption:any = [{ label: '초등교육', value: 'opt0' }, { label: '중등교육', value: 'opt1' }];
  public selectedMedia: any = 'opt1';

  public contentsCols:any[] = [
    { header: '순위', field: 'ranking' },
    { header: 'CID', field: 'cid' },
    { header: '제목', field: 'title' },
    { header: '재생목록', field: 'playList' },
    { header: '영상길이', field: 'videoTime' },
    { header: '총 재생시간', field: 'totalPlayTime' },
    { header: '평균 재생시간', field: 'averagePlayTime' },
    { header: '전체 재생수', field: 'totalPlayCount' },
    { header: '유니크 재생수', field: 'uniquePlayCount' },
    { header: '등록일', field: 'regdate' },
  ];
  public contentsRowData:any[] = [
    { ranking: '1', cid: '4545', title: '토익1회', playList: '자격증 영어', videoTime: '00:11:22', totalPlayTime: '00:11:22', averagePlayTime: '00:11:22', totalPlayCount: '45454', uniquePlayCount: '47545', regdate: '2018-09-09' },
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
