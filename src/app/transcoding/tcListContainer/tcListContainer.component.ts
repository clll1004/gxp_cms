/**
 * Created by GRE511 on 2018-07-17.
 */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CmsApis } from '../../services/apis/apis';
import { LoginService } from "../../login/login.service";
import { TranscodingService } from '../../services/apis/cms/transcoding/transcoding.service';
import { ConfirmationService } from 'primeng/components/common/api';

@Component({
  selector: 'tcListContainer',
  templateUrl: './tcListContainer.component.html',
  styleUrls: ['../transcoding.component.css'],
  providers: [ TranscodingService, CmsApis, ConfirmationService ]
})
export class TcListContainerComponent implements OnInit {
  @Input() params: object;

  public groupSeq: string = '';
  public url: string = '';
  /*for dropdown*/
  public selectedGroupOptions: any[] = [];
  public selectedGroup: string ='';

  /*for Table*/
  public gettotalListLength: number = 0;

  public tcMonitoringLists: any[];
  public filterTcMonitoringLists: any[];

  public selectItems: any[];
  public searchKey: string = '';

  public tcStandByCols = [
    {field: '', header: '', width: '5%'},
    {field: '', header: 'No', width: '5%'},
    {field: 'grp_nm', header: '그룹명', width: '25%'},
    {field: 'ft_path', header: '원본 파일 경로', width: '25%'},
    {field: 'ft_reg_dtm', header: '등록일', width: '20%'}
  ];
  public tcRequestCols = [
    {field: '', header: '', width: '5%'},
    {field: '', header: 'No', width: '5%'},
    {field: 'grp_nm', header: '그룹명', width: '25%'},
    {field: 'ft_path', header: '원본 파일 경로', width: '25%'},
    {field: 'ft_reg_dtm', header: '등록일', width: '20%'}
  ];
  public tcProgressCols = [
    {field: '', header: '', width: '5%'},
    {field: '', header: 'No', width: '5%'},
    {field: 'grp_nm', header: '그룹명', width: '10%'},
    {field: 'ft_path', header: '파일 경로', width: '15%'},
    {field: 'gto_nm', header: '변환 옵션', width: '5%'},
    {field: 'ft_progress', header: '진행율', width: '9%'},
    {field: 'ft_ts_ip', header: '트랜스코딩서버 IP', width: '14%'},
    {field: 'ft_reg_dtm', header: '등록일', width: '9%'},
    {field: 'ft_start_dtm', header: '변환시작일시', width: '9%'},
    {field: 'ft_end_dtm', header: '변환최종일시', width: '9%'}
  ];
  public tcCompleteCols = [
    {field: '', header: '', width: '5%'},
    {field: '', header: 'No', width: '5%'},
    {field: 'grp_nm', header: '그룹명', width: '13%'},
    {field: 'ft_path', header: '파일 경로', width: '22%'},
    {field: 'ft_ts_ip', header: '트랜스코딩서버 IP', width: '15%'},
    {field: 'ft_reg_dtm', header: '등록일', width: '10%'},
    {field: 'ft_start_dtm', header: '변환시작일시', width: '10%'},
    {field: 'ft_end_dtm', header: '변환최종일시', width: '10%'}
  ];
  public tcFailCols = [
    {field: '', header: '', width: '5%'},
    {field: '', header: 'No', width: '5%'},
    {field: 'grp_nm', header: '그룹명', width: '10%'},
    {field: 'ft_path', header: '파일 경로', width: '20%'},
    {field: 'ft_ts_ip', header: '트랜스코딩서버 IP', width: '20%'},
    {field: 'ft_fail_cnt', header: '실패 횟수', width: '10%'},
    {field: 'ft_msg', header: '실패 메시지', width: '10%'},
    {field: 'ft_end_dtm', header: '변환최종일시', width: '10%'}
  ];

  constructor(private activatedRoute: ActivatedRoute,
              private loginService: LoginService,
              private transcodingService: TranscodingService,
              private cmsApis: CmsApis,
              private confirmationService: ConfirmationService) { }

  public urlList: object = {
    'standby': this.cmsApis.loadStandbyList,
    'request': this.cmsApis.loadRequestList,
    'progress': this.cmsApis.loadProgressList,
    'complete': this.cmsApis.loadCompleteList,
    'fail': this.cmsApis.loadFailList
  };


  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
      this.load();
      this.pageInit();
      this.loadTranscodingList();
    });
  }

  load() {
    this.loadGroupSeq();
    this.loadGroupList();
  }

  loadGroupSeq() {
    this.groupSeq = this.loginService.getCookie('grp_seq');
  }

  loadGroupList() {
    this.selectedGroup = '';
    this.selectedGroupOptions = [];
    this.transcodingService.getLists(this.cmsApis.loadTranscodingGroupNames + this.groupSeq)
      .toPromise()
      .then((cont) => {
        let list = JSON.parse(cont['_body']);
        list.forEach((item:any) => {
          item.label = item.grp_nm;
          item.value = item.grp_nm;
          this.selectedGroupOptions.push(item);
        });

        this.selectedGroupOptions.forEach((item) => {
          if(item.grp_seq === this.groupSeq) {
            this.selectedGroup = item.grp_nm;
          }
        })
      })
      .catch((error) => { console.log(error); });
  }

  pageInit() {
    this.searchKey = '';
    this.selectItems = [];
    this.tcMonitoringLists = [];
    this.gettotalListLength = 0;
    if(this.urlList.hasOwnProperty(this.params['id'])) {
      this.url = this.urlList[this.params['id']] + this.groupSeq;
    }
  }

  loadTranscodingList() {
    this.transcodingService.getLists(this.url)
      .toPromise()
      .then((cont:any) => {
        if(cont.status !== 0) {
          this.tcMonitoringLists = JSON.parse(cont['_body']);
          this.filterTcMonitoringLists = this.tcMonitoringLists['list'];
          this.tableInit();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  tableInit() {
    if(this.filterTcMonitoringLists) {
      this.gettotalListLength = this.filterTcMonitoringLists.length;
      this.setTableIndex();
    }
  }

  refresh() {
    this.searchKey = '';
    this.loadTranscodingList();
  }

  filterSearch() {
    if(!this.filterTcMonitoringLists) {
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

  changeStatusRestart() {
    if (this.selectItems.length && this.filterTcMonitoringLists) {
      this.confirmationService.confirm({
        message: '변환을 재시작 하시겠습니까?',
        accept: () => {
          let newItemArray: any[] = [];
          let itemObject: any = {};
          this.selectItems.forEach((item) => {
            itemObject = {};
            itemObject.ft_seq = item.ft_seq;
            itemObject.ft_status = item.ft_status;
            newItemArray.push(itemObject);
          });

          this.transcodingService.updateData(this.cmsApis.restartTranscoding, newItemArray)
            .toPromise()
            .then(() => {
              this.selectItems = [];
              this.loadTranscodingList();
              this.gettotalListLength = this.filterTcMonitoringLists.length;
              this.setTableIndex();
            })
            .catch((error: any) => {
              console.log(error);
            });
        }
      });
    }
  }

  setTableIndex() {
    let num:number = 0;
    this.filterTcMonitoringLists.forEach((item) => {
      num = num + 1;
      item.index = num;
    });
  }
}
