/**
 * Created by GRE511 on 2019-01-09.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../breadcrumb.service';
import { MediaTransformService } from '../../../../demo/service/mediaTransform.service';

@Component({
  selector: 'trans-monitoring',
  styleUrls: ['./trans-monitoring.component.css'],
  templateUrl: './trans-monitoring.component.html'})

export class TransMonitoringComponent implements OnInit {
  public tabIndex:number = 0;
  public transMonitoringCols:any[] = [
    { header: '미디어보관함', field: 'gf_nm', width: '10%' },
    { header: '파일명', field: 'fo_nm', width: '15%' },
    { header: '파일경로', field: 'fo_path', width: '15%' },
    { header: '변환상태', field: 'status', width: '6%' },
    { header: '진행률', field: 'ft_progress', width: '5%' },
    { header: '원본 파일 크기', field: 'fo_size', width: '10%' },
    { header: '변환 파일 크기', field: 'ft_size', width: '10%' },
    { header: '변환시작일', field: 'ft_start_dtm', width: '10%' },
    { header: '최종 작업시간', field: 'ft_end_dtm', width: '10%' },
  ];
  public transMonitoringRowData:any[] = [];
  public tempCompareItems:any[] = [];
  public transCodingStatusValue:any[] = ['전체', '대기', '진행', '완료', '실패'];

  public uploadDialog:boolean = false;
  public uploadDialogTitle:string = '파일올리기';
  public isFileUploading:boolean = false;
  public isCompleteUploading:boolean = false;
  public uploadFiles:any;
  public uploadCols:any[] = [
    { header: '미디어보관함', field: 'gf_nm', width: '12%' },
    { header: '파일명', field: 'fo_nm', width: '18%' },
    { header: '파일형식', field: 'filetype', width: '8%' },
    { header: '크기', field: 'content_size', width: '12%' },
    { header: '변환상태', field: 'status', width: '8%' },
    { header: '진행률', field: 'progress', width: '10%' },
  ];
  public uploadRowData:any[] = [
    { gf_nm: '초등교육', fo_nm: 'gomedu2.mp4', filetype: 'mp4', content_size: '134.13MB', status: '대기', progress: '30' },
    { gf_nm: '초등교육', fo_nm: '파일명.mp4', filetype: 'mp4', content_size: '134.13MB', status: '대기', progress: '10' },
    { gf_nm: '초등교육', fo_nm: 'gomedu2.mp4', filetype: 'mp4', content_size: '134.13MB', status: '대기', progress: '25' },
    { gf_nm: '초등교육', fo_nm: '파일명.mp4', filetype: 'mp4', content_size: '134.13MB', status: '대기', progress: '5' },
  ];
  public encodingPreset:string = 'origin';
  public selectSections:any[] = [
    { startTime: '03:04:05', endTime: '03:54:33', fullTime: '00:01:55', selectRange: [0, 100] },
  ];

  constructor(private breadcrumbService: BreadcrumbService, private mediaTransformService: MediaTransformService) {
    this.breadcrumbService.setItems([
      { label: '변환 모니터링', routerLink: ['/trans-monitoring'] },
    ]);
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loadTransList();
  }

  loadTransList() {
    const status = this.transCodingStatusValue[this.tabIndex];
    this.mediaTransformService.getTransList(status)
      .then((cont) => {
        this.transMonitoringRowData = cont['list'];
        this.transMonitoringRowData.reverse();
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
    this.loadTransList();
  }

  closePopup() {
    this.uploadDialog = false;
  }

  changeDialogTitle(e) {
    this.uploadDialogTitle = e.index === 0 ? '파일 올리기' : '편집해서 올리기';
  }

  startUploadFiles(txt) {
    this.uploadDialogTitle = txt;
    this.isFileUploading = true;
  }

  addSelectSection() {
    if (this.selectSections.length < 3) {
      this.selectSections.push({
        startTime: null,
        endTime: null,
        fullTime: '00:01:55',
        selectRange: [0, 100],
      });
    }
  }

  removeSelectSection(index) {
    this.selectSections.splice(index, 1);
  }
}

