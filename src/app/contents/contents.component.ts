import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Http, Headers } from '@angular/http';

@Component({
    selector: 'contents',
    templateUrl: './contents.component.html',
    styleUrls: ['./contents.component.css']
})
export class ContentsComponent implements OnInit {
    public groupList: TreeNode[];
    public selectGroup: TreeNode;
    public groupSeq:string = '1';

    public contentsLists: any[] = [];
    public filtercontentsLists: any[] = [];
    public selectItems:any[] = [];
    public searchKey: string = '';

    public showInfos: boolean = false;
    public transcodingStatus: any[] = [];
    public originFileInfo: any[] = [];

    public contentCols: any[] = [
        {field: '', header: '', width: '5%'},
        {field: '', header: '제목', width: '30%'},
        {field: '', header: '종류', width: '10%'},
        {field: '', header: '크기', width: '15%'},
        {field: '', header: '전체 변환율', width: '20%'},
        {field: '', header: '생성 날짜', width: '20%'},
    ];

    constructor(private http: Http) { }
    ngOnInit() {
        this.load();
    }

    load() {
        this.loadGroupList();
        this.loadContent();
    }

    loadGroupList() {
        return this.http.get('http://localhost:8080/src/app/contents/data.json')
          .toPromise()
          .then((res) => {
              this.groupList = <TreeNode[]> res.json().data;
          });
    }
    getGroupSeq() {
        if (this.selectGroup.label === 'Work') {
            this.groupSeq = '1';
        } else if (this.selectGroup.label === 'Sub') {
            this.groupSeq = '2';
        }
        this.loadContent();
    }
    loadContent() {
        return this.http.get('http://183.110.11.49/cms/contents/list?page=1&row=100&gf_seq=' + this.groupSeq)
          .toPromise()
          .then((cont) => {
              this.contentsLists = JSON.parse(cont['_body']).list;
              this.filtercontentsLists = this.contentsLists;
          });
    }

    changeStatusRestart() {
        let newItemArray:any[] = [];
        let itemObject:any = {};
        this.selectItems.forEach((item) => {
            itemObject = {};
            itemObject.fo_seq = item.fo_seq;
            newItemArray.push(itemObject);
        });

        let headers:Headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        return this.http.put('http://183.110.11.49/cms/contents', newItemArray, { headers: headers })
          .toPromise()
          .then(() => {window.location.reload();})
          .catch((error:any) => {
              console.log(error);
          });
    }
    changeStatusDelete() {
        console.log(this.selectItems);
    }
    filterSearch() {
        this.filtercontentsLists = [];
        this.contentsLists.filter((item) => {
            if(this.searchKey && item.fo_nm && item.fo_nm.indexOf(this.searchKey) >= 0) {
                this.filtercontentsLists.push(item);
            }
        });
    }

    showPreview(item:any) {
        this.showInfos = true;
        /*썸네일 미리보기*/
        /*원본 파일 정보*/
        this.originFileInfo = item;

        /*트랜스코딩 진행상황*/
        this.transcodingStatus = [];
        this.http.get('http://183.110.11.49/cms/contents/list/tcd/' + item.fo_seq)
          .toPromise()
          .then((cont) => {
              this.transcodingStatus = JSON.parse(cont['_body']);

              this.transcodingStatus.forEach((item) => {
                  if(item.ft_status == 'U') {
                      item.statusLabel = '변환요청';
                  } else if(item.ft_status == 'TR') {
                      item.statusLabel = '변환중';
                  } else if(item.ft_status == 'TT') {
                      item.statusLabel = '변환완료';
                  } else if(item.ft_status == 'TS') {
                      item.statusLabel = '변환실패';
                  } else if(item.ft_status == 'SS') {
                      item.statusLabel = '전송완료';
                  } else if(item.ft_status == 'SF') {
                      item.statusLabel = '전송실패';
                  }
              });
          });

    }
}
