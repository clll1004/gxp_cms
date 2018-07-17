/**
 * Created by GRE511 on 2018-07-17.
 */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Http, Headers } from "@angular/http";

@Component({
  selector: 'tcListContainer',
  templateUrl: './tcListContainer.component.html',
  styleUrls: ['../transcoding.component.css']
})
export class TcListContainerComponent implements OnInit {
  @Input() params: object;

  public url: string = '';
  /*for dropdown*/
  public selectedGroupOptions: any[] = [];
  public selectedGroup: any[];

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
    {field: 'ft_path', header: '파일 경로', width: '25%'},
    {field: 'ft_reg_dtm', header: '등록일', width: '20%'},
    {field: '', header: '관리', width: '10%'}
  ];
  public tcRequestCols = [
    {field: '', header: '', width: '5%'},
    {field: '', header: 'No', width: '5%'},
    {field: 'grp_nm', header: '그룹명', width: '25%'},
    {field: 'ft_path', header: '파일 경로', width: '35%'},
    {field: 'ft_reg_dtm', header: '등록일', width: '20%'},
    {field: '', header: '관리', width: '10%'}
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
    {field: 'ft_end_dtm', header: '변환최종일시', width: '9%'},
    {field: '', header: '관리', width: '10%'}
  ];
  public tcCompleteCols = [
    {field: '', header: '', width: '5%'},
    {field: '', header: 'No', width: '5%'},
    {field: 'grp_nm', header: '그룹명', width: '13%'},
    {field: 'ft_path', header: '파일 경로', width: '22%'},
    {field: 'ft_ts_ip', header: '트랜스코딩서버 IP', width: '15%'},
    {field: 'ft_reg_dtm', header: '등록일', width: '10%'},
    {field: 'ft_start_dtm', header: '변환시작일시', width: '10%'},
    {field: 'ft_end_dtm', header: '변환최종일시', width: '10%'},
    {field: '', header: '관리', width: '10%'}
  ];
  public tcFailCols = [
    {field: '', header: '', width: '5%'},
    {field: '', header: 'No', width: '5%'},
    {field: 'grp_nm', header: '그룹명', width: '10%'},
    {field: 'ft_path', header: '파일 경로', width: '20%'},
    {field: 'ft_ts_ip', header: '트랜스코딩서버 IP', width: '20%'},
    {field: 'ft_fail_cnt', header: '실패 횟수', width: '10%'},
    {field: 'ft_msg', header: '실패 메시지', width: '10%'},
    {field: 'ft_end_dtm', header: '변환최종일시', width: '10%'},
    {field: '', header: '관리', width: '10%'}
  ];

  constructor(private activatedRoute: ActivatedRoute, private http: Http) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
      this.selectItems = [];

      this.tcMonitoringLists = [];
      if (this.params['id'] === 'tcStandByMT') {
        this.url = 'http://183.110.11.49/cms/transcoding/list?page=1&row=10000&ft_status=U';
      } else if (this.params['id'] === 'tcRequestMT') {
        this.url = 'http://183.110.11.49/cms/transcoding/list?page=1&row=10000&ft_status=TR';
      } else if (this.params['id'] === 'tcProgressMT') {
        this.url = 'http://183.110.11.49/cms/transcoding/list?page=1&row=10000&ft_status=TT';
      } else if (this.params['id'] === 'tcCompleteMT') {
        this.url = 'http://183.110.11.49/cms/transcoding/list?page=1&row=10000&ft_status=TS';
      } else if (this.params['id'] === 'tcFailMT') {
        this.url = 'http://183.110.11.49/cms/transcoding/list?page=1&row=10000&ft_status=TD';
      }

      this.http.get(this.url)
        .toPromise()
        .then((cont) => {
          this.tcMonitoringLists = JSON.parse(cont['_body']);
          this.filterTcMonitoringLists = this.tcMonitoringLists['list'];
          this.gettotalListLength = this.filterTcMonitoringLists.length;
          this.setTableIndex();
        })
        .catch((error) => {
          console.log(error);
        })
      this.load();
    });
  }

  load() {
    this.loadGroupList();
  }
  loadGroupList() {
    this.selectedGroupOptions = [];
    let list;
    this.http.get(this.url).subscribe((params)=>{
      list = JSON.parse(params["_body"]).list;
      list.forEach((item:any) => {
        item.label = item.grp_nm;
        item.value = item.grp_nm;
        this.selectedGroupOptions.push(item);
      });
    });
  }

  filterSearch() {
    this.filterTcMonitoringLists = [];
    this.tcMonitoringLists['list'].filter((item:any) => {
      if (item.ft_path && (item.ft_path.indexOf(this.searchKey) >= 0)) {
        this.filterTcMonitoringLists.push(item);
      }
    });
    this.gettotalListLength = this.filterTcMonitoringLists.length;
    this.setTableIndex();
  }
  filterListUseAll() {
    this.filterTcMonitoringLists = this.tcMonitoringLists['list'];
    this.gettotalListLength = this.filterTcMonitoringLists.length;
    this.setTableIndex();
  }
  filterListUse(data:string) {
    this.filterTcMonitoringLists = [];
    this.tcMonitoringLists['list'].filter((ipItem:any) => {
      if(ipItem.ts_use_yn === data) {
        this.filterTcMonitoringLists.push(ipItem);
      }
    });
    this.gettotalListLength = this.filterTcMonitoringLists.length;
    this.setTableIndex();
  }
  refresh() {
    window.location.reload();
  }

  changeStatus() {
    let newItemArray:any[] = [];
    let itemObject:any = {};
    this.selectItems.forEach((item) => {
      itemObject = {};
      itemObject.ft_seq = item.ft_seq;
      newItemArray.push(itemObject);
    });
    this.updateTranscodingStatus(newItemArray);

    this.gettotalListLength = this.filterTcMonitoringLists.length;
    this.setTableIndex();
  }
  updateTranscodingStatus (newData: any[]) {
    let headers:Headers = new Headers();
    let statusUrl:string = '';
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    if(this.params['id'] === 'tcFailMT') {
      statusUrl = 'http://183.110.11.49/adm/transcoding/updatedeltemp';
    } else {
      statusUrl = 'http://183.110.11.49/adm/transcoding/updateretry';
    }

    return this.http.put(statusUrl, newData, { headers: headers})
      .toPromise()
      .then(() => {window.location.reload();})
      .catch((error) => {
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
