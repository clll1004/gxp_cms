/**
 * Created by GRE511 on 2018-07-17.
 */
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CmsApis } from '../../../services/apis/apis';
import { CookieService } from '../../../services/library/cookie/cookie.service';
import { TranscodingService } from '../../../services/apis/cms/transcoding/transcoding.service';

@Component({
  selector: 'transTable',
  templateUrl: './transTable.component.html',
  styleUrls: ['../transcoding.component.css']})

export class TransTableComponent implements OnInit, OnDestroy {
  public isLoading:boolean = false;
  public isShow:boolean = false;
  public popupType:string = '';
  public popupMessage:string = '';

  public tableType:string = 'standby';

  public groupSeq: string = '';
  public url: string = '';
  /*for dropDown*/
  public selectedGroupOptions: any[] = [];
  public selectedGroup: string = '';

  /*for Table*/
  public getTotalListLength: number = 0;
  public tcMonitoringLists: any[];
  public filterTcMonitoringLists: any[];

  public selectItems: any[];
  public searchKey: string = '';

  public tcStandByCols = [
    { field: '', header: '', width: '5%' },
    { field: '', header: 'No', width: '5%' },
    { field: 'grp_nm', header: '그룹명', width: '25%' },
    { field: 'ft_path', header: '원본 파일 경로', width: '25%' },
    { field: 'ft_reg_dtm', header: '등록일', width: '20%' }];
  public tcRequestCols = [
    { field: '', header: '', width: '5%' },
    { field: '', header: 'No', width: '5%' },
    { field: 'grp_nm', header: '그룹명', width: '25%' },
    { field: 'ft_path', header: '원본 파일 경로', width: '25%' },
    { field: 'ft_reg_dtm', header: '등록일', width: '20%' }];
  public tcProgressCols = [
    { field: '', header: '', width: '5%' },
    { field: '', header: 'No', width: '5%' },
    { field: 'grp_nm', header: '그룹명', width: '7%' },
    { field: 'ft_path', header: '파일 경로', width: '17%' },
    { field: 'gto_nm', header: '변환 옵션', width: '8%' },
    { field: 'ft_progress', header: '진행율', width: '13%' },
    { field: 'ft_ts_ip', header: '트랜스코딩서버 IP', width: '14%' },
    { field: 'ft_reg_dtm', header: '등록일', width: '9%' },
    { field: 'ft_start_dtm', header: '변환시작일시', width: '9%' },
    { field: 'ft_end_dtm', header: '변환최종일시', width: '9%' }];
  public tcCompleteCols = [
    { field: '', header: '', width: '5%' },
    { field: '', header: 'No', width: '5%' },
    { field: 'grp_nm', header: '그룹명', width: '13%' },
    { field: 'ft_path', header: '파일 경로', width: '22%' },
    { field: 'ft_ts_ip', header: '트랜스코딩서버 IP', width: '15%' },
    { field: 'ft_reg_dtm', header: '등록일', width: '10%' },
    { field: 'ft_start_dtm', header: '변환시작일시', width: '10%' },
    { field: 'ft_end_dtm', header: '변환최종일시', width: '10%' }];
  public tcFailCols = [
    { field: '', header: '', width: '5%' },
    { field: '', header: 'No', width: '5%' },
    { field: 'grp_nm', header: '그룹명', width: '10%' },
    { field: 'ft_path', header: '파일 경로', width: '20%' },
    { field: 'ft_ts_ip', header: '트랜스코딩서버 IP', width: '20%' },
    { field: 'ft_fail_cnt', header: '실패 횟수', width: '10%' },
    { field: 'ft_msg', header: '실패 메시지', width: '10%' },
    { field: 'ft_end_dtm', header: '변환최종일시', width: '10%' }];

  public progressInterval:any;

  constructor(private cookieService: CookieService,
              private transCodingService: TranscodingService,
              private cmsApi: CmsApis) { }

  public urlList: object = {
    standby: this.cmsApi.loadStandbyList,
    request: this.cmsApi.loadRequestList,
    progress: this.cmsApi.loadProgressList,
    complete: this.cmsApi.loadCompleteList,
    fail: this.cmsApi.loadFailList};

  ngOnInit() {
    this.groupSeq = this.cookieService.getCookie('grp_seq');
    this.loadGroupList();
    this.init();
  }

  ngOnDestroy() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  loadGroupList() {
    this.selectedGroup = '';
    this.selectedGroupOptions = [];
    this.transCodingService.getLists(this.cmsApi.loadTransCodingGroupNames + this.groupSeq)
      .toPromise()
      .then((cont) => {
        const list = JSON.parse(cont['_body']);
        list.forEach((item:any) => {
          item.label = item.grp_nm;
          item.value = item.grp_nm;
          this.selectedGroupOptions.push(item);
        });

        this.selectedGroupOptions.forEach((item) => {
          if (item.grp_seq === this.groupSeq) {
            this.selectedGroup = item.grp_nm;
          }
        });
      })
      .catch((error) => { console.log(error); });
  }

  init() {
    this.searchKey = '';
    this.selectItems = [];
    this.tcMonitoringLists = [];
    this.getTotalListLength = 0;
    if (this.urlList.hasOwnProperty(this.tableType)) {
      this.url = this.urlList[this.tableType] + this.groupSeq;
    }
    this.loadTranscodingList();

    if (this.tableType === 'progress') {
      this.progressInterval = setInterval(() => { this.loadTranscodingList(); }, 5000);
    } else {
      clearInterval(this.progressInterval);
    }
  }

  loadTranscodingList() {
    this.filterTcMonitoringLists = [];
    this.isLoading = true;
    this.transCodingService.getLists(this.url)
      .toPromise()
      .then((cont:any) => {
        if (cont.status !== 0) {
          this.tcMonitoringLists = JSON.parse(cont['_body']);
          this.filterTcMonitoringLists = this.tcMonitoringLists['list'];
          this.tableInit();
        }
      })
      .then(() => {
        this.isLoading = false;
      })
      .catch(() => { });
  }

  tableInit() {
    if (this.filterTcMonitoringLists) {
      this.getTotalListLength = this.filterTcMonitoringLists.length;
      this.setTableIndex();
    }
  }

  refresh() {
    this.searchKey = '';
    this.loadTranscodingList();
  }

  filterSearch() {
    if (!this.filterTcMonitoringLists) {
      return false;
    }
    this.filterTcMonitoringLists = [];
    this.tcMonitoringLists['list'].filter((item:any) => {
      if (item.grp_nm && (item.grp_nm === this.selectedGroup) && item.ft_path && (item.ft_path.indexOf(this.searchKey) >= 0)) {
        this.filterTcMonitoringLists.push(item);
      } else if (item.grp_nm && (item.grp_nm === this.selectedGroup) && !this.searchKey) {
        this.filterTcMonitoringLists.push(item);
      } else if (!this.selectedGroup && item.ft_path && (item.ft_path.indexOf(this.searchKey) >= 0)) {
        this.filterTcMonitoringLists.push(item);
      }
    });
    this.tableInit();
  }

  isShowPopup(is:boolean) {
    this.isShow = is;
  }

  isConfirmation(is:boolean) {
    if (is) {
      this.changeStatusRestart();
    }
  }

  restart() {
    if (!this.selectItems.length) {
      this.popupType = 'message';
      this.popupMessage = '콘텐츠를 선택해주세요.';
      this.isShow = true;
      return false;
    }
    this.popupType = 'confirm';
    this.popupMessage = '변환을 재시작 하시겠습니까?';
    this.isShow = true;
  }

  changeStatusRestart() {
    const newItemArray: any[] = [];
    let itemObject: any = {};
    this.selectItems.forEach((item) => {
      itemObject = {};
      itemObject.ft_seq = item.ft_seq;
      itemObject.ft_status = item.ft_status;
      newItemArray.push(itemObject);
    });

    this.transCodingService.updateData(this.cmsApi.restartTransCoding, newItemArray)
      .toPromise()
      .then(() => {
        this.selectItems = [];
        this.loadTranscodingList();
        this.getTotalListLength = this.filterTcMonitoringLists.length;
        this.setTableIndex();
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  setTableIndex() {
    let num:number = 0;
    this.filterTcMonitoringLists.forEach((item) => {
      num = num + 1;
      item.index = num;
    });
  }
}
