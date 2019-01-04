/**
 * Created by GRE511 on 2019-01-03.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'byDate',
  styleUrls: ['../../../statistics.component.css'],
  templateUrl: './byDate.component.html'})

export class ByDateComponent implements OnInit {
  public rangeDates:Date[] = [new Date(), new Date()];
  public searchTypeOption:any = [{ label: '재생목록', value: 'playList' }, { label: '동영상', value: 'video' }];
  public searchSelectedType: any;

  public typeOption:any = [{ label: '재생목록', value: 'playList' }, { label: '동영상', value: 'video' }];
  public selectedType: any = 'playList';

  public playListOption:any = [{ label: '초등교육', value: 'opt0' }, { label: '중등교육', value: 'opt1' }];
  public selectedPlayList: any = 'opt1';

  public mediaOption:any = [{ label: '초등교육', value: 'opt0' }, { label: '중등교육', value: 'opt1' }];
  public selectedMedia: any = 'opt1';

  public videoOption:any = [{ label: '초1영어 1강', value: 'opt0' }, { label: '중1영어 1강', value: 'opt1' }];
  public selectedVideo: any = 'opt1';

  public searchCols0:any[] = [
    { header: '재생목록', field: 'playList' },
    { header: '콘텐츠 수', field: 'contentsCount' },
  ];
  public searchRowData0:any[] = [
    { playList: '중등영어', contentsCount: '123' },
    { playList: '중등수학', contentsCount: '555' },
  ];

  public searchCols1:any[] = [
    { header: 'CID', field: 'cid' },
    { header: '영상 제목', field: 'contentsName' },
    { header: '미디어 보관함', field: 'mediaStorage' },
    { header: '재생목록', field: 'playList' },
    { header: '영상시간', field: 'videoTime' },
  ];
  public searchRowData1:any[] = [
    { cid: '12345', contentsName: '영어 1강', mediaStorage: '중학교 강좌', playList: '중등 영어', videoTime: '00:11:22'  },
  ];

  public playListCols:any[] = [
    { header: '날짜', field: 'date' },
    { header: '콘텐츠 수', field: 'contentsCount' },
    { header: '전체 재생수', field: 'totalPlayCount' },
    { header: '유니크 재생수', field: 'uniquePlayCount' },
    { header: '평균 전체 재생수', field: 'averageTotalPlayCount' },
    { header: '평균 유니크 재생수', field: 'averageUniquePlayCount' },
  ];
  public playListRowData:any[] = [
    { date: '2018-09-01', contentsCount: '123', totalPlayCount: '456', uniquePlayCount: '456', averageTotalPlayCount: '456', averageUniquePlayCount: '456' },
  ];

  public videoCols:any[] = [
    { header: '날짜', field: 'date' },
    { header: '전체 재생수', field: 'totalPlayCount' },
    { header: '유니크 재생수', field: 'uniquePlayCount' },
    { header: '점유율', field: 'share' },
    { header: '총 시청시간', field: 'totalViewingTime' },
  ];
  public videoRowData:any[] = [
    { date: '2018-09-01', totalPlayCount: '456', uniquePlayCount: '456', share: '50%', totalViewingTime: '00:11:22' },
  ];

  constructor() {}

  ngOnInit() {
  }
}
