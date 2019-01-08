/**
 * Created by GRE511 on 2019-01-07.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BreadcrumbService } from '../../../../breadcrumb.service';

@Component({
  selector: 'media-storage',
  styleUrls: ['./media-storage.component.css'],
  templateUrl: './media-storage.component.html'})

export class MediaStorageComponent implements OnInit {
  public params:Params;

  public storageList:any = [{ label: '전체', value: 'all' }, { label: '광고전송', value: 'transmitAd' }, { label: '스킨변경', value: 'changeSkin' }];
  public selectedStorage: any = 'all';

  public mediaStorageCols:any[] = [
    { header: 'CID', field: 'cid' },
    { header: '썸네일', field: 'thumbnail' },
    { header: '미디어보관함', field: 'mediaStorage' },
    { header: '영상 제목', field: 'contentsName' },
    { header: '파일명', field: 'fileName' },
    { header: '파일형태', field: 'fileType' },
    { header: '크기', field: 'fileSize' },
    { header: '변환상태', field: 'transitionStatus' },
    { header: '등록일시', field: 'regdate' },
  ];
  public mediaStorageRowData:any[] = [
    { cid: '1231', thumbnail: 'http://str.gomgxp.com/thail/GXP/2018/fLayoutTest/KakaoTalk_Video_20170612_1744_48_996/KakaoTalk_Video_20170612_1744_48_9960001.jpg', mediaStorage: 'GXP', contentsName: '자격증 교육', fileName: 'adf.mp4', fileType: 'mp4', fileSize: '241MB', transitionStatus: '완료', regdate: '2019-09-09' },
    { cid: '4567', thumbnail: 'http://str.gomgxp.com/thail/GXP/2018/%EA%B3%B5%EC%9D%B8%EC%A4%91%EA%B0%9C%EC%82%AC%20%EC%A4%91%EA%B0%9C%EC%82%AC%EB%B2%95%20%EC%95%94%EA%B8%B0%EB%B2%95%ED%8A%B9%EA%B0%95/%EA%B3%B5%EC%9D%B8%EC%A4%91%EA%B0%9C%EC%82%AC%20%EC%A4%91%EA%B0%9C%EC%82%AC%EB%B2%95%20%EC%95%94%EA%B8%B0%EB%B2%95%ED%8A%B9%EA%B0%950001.jpg', mediaStorage: 'GXP', contentsName: '자격증 교육', fileName: 'adf.mp4', fileType: 'mp4', fileSize: '241MB', transitionStatus: '완료', regdate: '2019-09-09' },
  ];
  public tempCompareItems:any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '미디어보관함', routerLink: ['/mediaStorage'] },
    ]);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });
  }
}

